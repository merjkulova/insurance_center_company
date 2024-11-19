const express = require('express');
const nodemailer = require('nodemailer');

const server = express();

server.use(express.static(__dirname + '/'));
server.use(express.json());

server.get('/', (req, res) =>{
  res.sendFile("index.html", { root: __dirname})
})

server.post("/api/feedback", async (req, res) => {
    try{
        const transporter = nodemailer.createTransport({
            host: "####",
            port: 422135,
            secure: true,
            auth:{
                user: '####',
                pass: '#####',
            }
        });

        const {name, phone, email, service, message} = req.body;

        await transporter.sendMail({
            from: "####",
            to: "####",
            subject: "Форма от пользователя сайта",
            text: `ФИО пользователя ${name}, ${phone}, ${email}, ${service},${message}`,
            html:
            `
            <h1><i>Данные пользователя!</i></h1>
            <p>ФИО пользователя:</p>
            <h2>${name}</h2>
            <p>Номер телефона:</p>
            <h2>${phone}</h2>
            <p>Электронная почта:</p>
            <h2>${email}</h2>
            <p>Выбранная услуга:</p>
            <h2>${service}</h2>
            <p>Дополнительная информация:</p>
            <h2>${message}</h2>
            <br></br>
            <h2>Прошу дать обратную связь !)</h2>
            `
        })


            return res.status(200).send({
                status: 200,
                message: "Успешная отправка!"
            })
    }catch(e){
        return res.status(500).send({
            status: 500, 
            message: 'Ошибка при запросе'
        })
    }
})
const host = '127.0.0.1';
const port = 3000;


server.listen(port, host, () => {
  console.log(`Server is listening on http://${host}:${port}`);
})