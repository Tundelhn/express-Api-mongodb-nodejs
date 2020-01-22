const router = require("express").Router()
const Subscriber = require("../models/subscribers")

router.get("/", async(req, res) => {
    try {
        const subscriber = await Subscriber.find()
        res.status(200).json({ subscriber })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

router.get("/:id", getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

router.post("/", async(req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json({ msg: "subscriber saved" })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }

})

router.patch("/:id", getSubscriber, async(req, res) => {
    const { name, subscribedToChannel } = req.body
    if (res.subscriber.name !== null) {
        res.subscriber.name = name
    }
    if (res.subscriber.subscribedToChannel !== null) {
        res.subscriber.subscribedToChannel = subscribedToChannel
    }
    try {
        const updateSubscriber = res.subscriber.save()
        res.json(updateSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete("/:id", getSubscriber, async(req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ msg: "deletede subscriber" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: "no subscriber with the id" })
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    res.subscriber = subscriber
    next()
}


module.exports = router