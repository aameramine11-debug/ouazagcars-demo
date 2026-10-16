# OUAZAG CARS — React / Vite

Site de location automobile avec design noir & gold, formulaire de devis WhatsApp, calcul de prix, et pages séparées.

## Lancer en local

```bash
npm install
npm run dev
```

## Pages

- `/` : accueil, flotte vedette, prix et formulaire de demande WhatsApp
- `/flotte` : les 8 véhicules
- `/services` : services, livraison, horaires et franchise annoncée de 8 000 DH
- `/decouvrir` : page dédiée à la découverte d’Agadir et des environs
- `/faq` : page FAQ dédiée

## Informations utilisées

- WhatsApp : +212 662 839 966
- Email : ouazagcars@gmail.com
- Adresse : COMPLEXE SOUS RUE SOUK MG N:45 AGADIR
- Horaires de contact : tous les jours, 09:00–23:00
- Hyundai Accent : 350 DH/jour
- Autres véhicules : 300 DH/jour
- Promotion : dès 15 jours de location, remise de 50 DH/jour
- Franchise annoncée : 8 000 DH, à confirmer avec l’agence avant réservation

## Déploiement sur hébergement Apache

Lancez `npm run build`, puis envoyez le contenu du dossier `dist` vers le dossier public de votre hébergement. Le fichier `public/.htaccess` permet le fallback vers `index.html` pour les pages React.

**Note :** le build n’a pas pu être exécuté dans l’environnement de préparation, car l’installation des dépendances a dépassé le délai disponible. Vérifiez `npm install` et `npm run build` sur votre PC avant de publier.
