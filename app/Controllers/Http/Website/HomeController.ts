// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {Client, ClientSession} from "whatsapp-web.js"
import Ws from "App/Services/WebSocket/Ws"
import QRCode from "qrcode"
import fs from "fs"
import Application from "@ioc:Adonis/Core/Application"

export default class HomeController {
  public async index({view}) {
    const SESSION_FILE_PATH = Application.configPath('whatsapp-session.json') ;
    let sessionCfg: ClientSession | undefined;
    if (fs.existsSync(SESSION_FILE_PATH)) {
      sessionCfg = require(SESSION_FILE_PATH);
    }

    const client = new Client({
      session: sessionCfg
    });

    client.on('qr', (qr) => {
      console.log("QR RECEIVED", qr);
      QRCode.toDataURL(qr)
        .then(url => {
          Ws.io.emit('qr', url);
          Ws.io.emit('message', 'QR Code Received, scan please!')
        })
        .catch(err => {
          Ws.io.emit('message', 'Error QR Code ' + err);
        });
    });

    client.on('ready', () => {
      console.log('Client is ready!');
    });

    client.on('message', msg => {
      if (msg.body == '!ping') {
        Ws.io.emit("message", "Pesan Masuk Dari " + msg.from)
        msg.reply('pong');
      }
    });

    client.on('authenticated', (session) => {
      Ws.io.emit('authenticated', 'Whatsapp is authenticated!');
      Ws.io.emit('message', 'Whatsapp is authenticated!');
      console.log('AUTHENTICATED', session);
      sessionCfg = session
      fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function(err) {
        if (err) {
          console.error(err);
          Ws.io.emit('message', 'Session Not Saved');
        }
        Ws.io.emit('message', 'Session Saved');
      });
    });

    client.initialize();

    Ws.io.emit("message", "Render View");

    return view.render('welcome');
  }
}
