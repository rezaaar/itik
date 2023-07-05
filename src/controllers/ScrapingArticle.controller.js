import puppeteer from "puppeteer";
import Models from "../models/index.js";

const ArticleScrape = Models.ArticleScrape
const Article = Models.Article

const ScrapingArticleController = {
    scrapingArticle: async (req, res) => {
        await Article.deleteMany({})
        puppeteer.launch({
            headless: false,
            defaultViewport: null
        }).then(async (browser) => {
            const page = await browser.newPage()

            await page.goto("https://kemahasiswaan.pens.ac.id/berita-lain/", {
                waitUntil: "domcontentloaded"
            })

            const totalArticlesPages = await page.evaluate(() => {
                return document.querySelector(".pt-cv-pagination").getAttribute("data-totalpages")
            })
            const articles = []

            for (let i = 1; i <= totalArticlesPages; i++) {
                await page.goto("https://kemahasiswaan.pens.ac.id/berita-lain/" + i, {
                    waitUntil: "domcontentloaded"
                })

                const articleListPage = await page.evaluate(() => {
                    const articleList = document.querySelectorAll(".pt-cv-ifield")

                    return Array.from(articleList).map((article) => {
                        // const title = article.querySelector(".pt-cv-title").innerText
                        // const content = article.querySelector(".pt-cv-content").innerText
                        const url = article.querySelector("a").href

                        return { url }
                    })
                })

                for (let j = 0; j < articleListPage.length; j++) {
                    const newPage = await browser.newPage()

                    await newPage.goto(articleListPage[j].url, {
                        waitUntil: "domcontentloaded"
                    })

                    const detailArticlePage = await newPage.evaluate(() => {
                        const data = {
                            title: document.querySelector(".entry-title").innerText,
                            description: document.querySelector(".entry-content").innerText,
                            publisher: document.querySelector(".author").innerText,
                            image: document.querySelector(".et_post_meta_wrapper > img").getAttribute("src"),
                            createdAt: document.querySelector(".published").innerText,
                            category: ['article']
                        }
                        return data
                    })

                    try {
                        const newData = new Article(detailArticlePage)
                        await newData.save()
                    } catch (error) {
                        res.status(400).json({ message: error })
                    }

                    articles.push(detailArticlePage)

                    await newPage.close()
                }
            }

            await browser.close()

            try {
                res.status(200).json({ message: "scraping and saving success" })
            } catch (error) {
                res.status(400).json({ message: error })
            }

        }).catch((error) => res.status(400).json({ message: error }))
    },

    getPaginateArticle: async (req,res, next) => {
        try {
            const {page = 1, limit = 8} = req.query
            
            const articles = await ArticleScrape.find({...req.query})
            .limit(limit*1)
            .skip((page-1) * limit)
            .sort({createdAt: -1})

            const count = await ArticleScrape.countDocuments()

            return res.status(200).json({
                articles,
                totalPages: Math.ceil(count/limit),
                currentPage: page
            })
        } catch (error) {
            res.status(400).json({message: error})
        }
    }
}

export default ScrapingArticleController