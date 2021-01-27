const webPush = require('web-push');

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fa606SCZ5is:APA91bGN-YPupptm2hjOZr-m13ZSa5l9ScJ1Di5LngnRn5k5F6yUpuDzWSNPcxaRCLFuyonBqQjgG_2bKEZ7WhwEZuDy0ZbOt8pDORzG2rJ4GwG0t3RzzIrO0IeuWoNRdtfRuisYzof_",
    "keys": {
        "p256dh": "BJbEgkiKtYHCENGE5DR2EXZ9N+T8WlTeA6TOS0sDxGNMLHSefTpksCjzWXhO8dJYzeBa0Mvs+/GCFMuhPxLm+is=",
        "auth": "Q6btYxN1bRTvbnsjDV28RA=="
    }
};

const vapidPublicKey = 'BHW5ZqRyDvt7UfK_3jciW3SL7qyQsx_icYubnqpvhwNMDqYDDF0v5nBP2HorWMXVs2WdMpExBgmZCWlh1pwqPMY';
const vapidPrivateKey = 'dEvLThr3TyWxn0cR15_xGppkYftDtM0JbjQQU-iZ5DM';

const payload = 'Tes Notifikasi';

const options = {
    gcmAPIKey: 'YOUR_SERVER_KEY',
    TTL: 60,
    vapidDetails: {
        subject: 'mailto: example@yourdomain.com',
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey
    }

};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);