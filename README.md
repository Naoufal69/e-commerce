# e-commerce
## Sommaire
- Résumé des différentes pages
- BackOffice
- Méthode de développement
- Comment déployer

### Résumé des différentes pages
Adresse de la prod : https://e-commerce-brown-gamma.vercel.app/

L'application comprend actuellement (03/03/2023) :

<ul>
    <li>Index à l'adresse <em>`/`</em> : c'est la vitrine du site, qui affiche les différents produits.</li>
    <li>Produit à l'adresse <em>`/Produit/:id`</em> : cette page affiche les données liées à un produit, et l'utilisateur peut ajouter le produit au panier depuis cette page. L'identifiant du produit est récupéré depuis l'URL.</li>
    <li>Panier à l'adresse <em>`/Panier`</em> : cette page affiche le contenu du panier de l'utilisateur, mais le panier est vidé après un rafraîchissement de la page. C'est depuis cette page que l'utilisateur peut passer une commande.</li>
    <li>Profile à l'adresse <em>`/Profile`</em> : cette page affiche la liste des commandes en cours, ainsi que leur état (validé, invalidé ou en attente). L'utilisateur peut également annuler une ou plusieurs commandes.</li>
    <li>Connexion à l'adresse <em>`/Connexion`</em> : cette page permet à l'utilisateur de se connecter.</li>
</ul>
Les routes sont protégées par un jeton d'authentification. Si le jeton existe et est valide, l'utilisateur peut effectuer les actions nécessaires.

### BackOffice
Adresse de la prod : https://e-commerce-fqfi.vercel.app/
Dans le backoffice, un administrateur peut valider ou invalider une commande. Ce modèle a été préféré à un système automatique pour vérifier que chaque commande est correcte et qu'elle ne pose pas de problème.

Le backoffice comprend actuellement (03/03/2023) :

<ul>
    <li>Login à l'adresse <em>`/`</em> : cette page permet à l'administrateur de se connecter.</li>
    <li>Admin à l'adresse <em>`/Admin`</em> : cette page affiche toutes les commandes en cours et permet à l'administrateur de les valider ou de les invalider.</li>
</ul>

### Méthode de développement
<p>Avant de développer, il est nécessaire de créer un firestore qui servira pour le local</p>
Pour développer une fonctionnalité, il est nécessaire de créer une branche depuis la branche principale (main) qui est la branche de production. Pour ce faire, utilisez la commande <code>git checkout -b 'nom-de-la-branche'</code>. Une fois cela fait, suivez les commandes suivantes :

<ul>
    <li><code>cd e-commerce <em>(ou cd e-commerce-BackOffice pour le backoffice)<em></code> </li>
    <li><code>pnpm install</code> </li>
    <li><code>pnpm run dev</code> </li>
</ul>
La version de développement sera disponible à l'adresse http://localhost:5173/.

### Comment déployer
Une fois que le développement est terminé, il faut créer une merge request sur la branche principale, attendre qu'un senior valide. Si ce n'est pas le cas, il faut refaire le développement. Sinon, il faut merger sur la branche principale, effectuer une qualification sur la branche principale en local. Une fois validé, il faut redéployer l'application sur Vercel.
