require('dotenv').config();
const nodemailer = require('nodemailer');
const { modelCall } = require('../../util/lib');

const {NODEMAILER_USER, NODEMAILER_PASS} = process.env;

const transPoter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth : {
        user : NODEMAILER_USER,
        pass : NODEMAILER_PASS
    },
});

function sendMailer(){
    let instance = null;
    return {
        getInstance : function(){
            if(instance == null){
                instance = async(from, to, subject, html) => {
                    const info = await transPoter.sendMail({
                        //from : `${from} <${NODEMAILER_USER} `,
                        from,
                        to,
                        subject,
                        html,
                    });
                    //console.log("sendMailer info", info);
                    return info;
                }
            }
            return instance;
        }
    }
}
module.exports = sendMailer().getInstance();