# webrtc-video-chat
### warnings
L'application est un peu lente, il faut être patient et attendre que la vidéo load bien. Elle fonctionne bien pour 2 utilisateurs, mais elle peut lagger lorsqu'il y a plus d'utilisateurs

Une fois un chat créé, vous pouvez share le link pour inviter d'autres participants.

lien de production: https://webrtc-video-chat-uuvid-19.herokuapp.com/

# choix technologiques
Le backend est fait avec javascript, node.js et socket.io pour la connection initial entre les paires.
Le frontend est fait avec React et utilise la librairie simple-peer pour gérer WebRTC. Pour faciliter le déploiment, j'ai utilisé un proxy pour rediriger les requêtes du frontend au backend.
