"use client"
import React from 'react'

const form = (req, res) => {
    try {
        const addText = "API側から戻ってきた：" + req.body.text
        console.log(addText)
        return res.status(200).json({ message: "送信成功", text: addText });
    } catch (error) {
        return res.status(400).json({ message: "送信失敗" });
    }
}

export default form