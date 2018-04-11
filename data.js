//Simule la recuperation des données de bases de la maison
var home = new Maison();

var etage1 = new Etage("1er Etage");
var etage2 = new Etage("2eme Etage");

var chambre = new Piece("Chambre", 0,0,210,100);
var wc = new Piece("Toilettes", 110,110,100,100);
var cuisine = new Piece("Cuisine", 0,110,100,100);
var salleDeBains = new Piece("Salle de bain", 50, 105, 100, 75);

var four = new Objet(cuisine, "Four", "Icone/four.png");
var reveil = new Objet(chambre, "Reveil", "Icone/reveil.png");
var frigo = new Objet(cuisine, "Frigo", "Icone/fridge.png");

var cuisson = new Action(four, "Cuisson", "degree", "°C");
var Degivrage = new Action(frigo, "Degivrage");
var alarme = new Action(reveil, "Alarme");
var radio = new Action(reveil, "Radio");

four.actions[0] = cuisson;
frigo.actions[0] = Degivrage;
reveil.actions[0] = alarme;
reveil.actions[1] = radio;

chambre.objets[0] = reveil;

cuisine.objets[0] = four;
cuisine.objets[1] = frigo;

etage1.pieces[0] = chambre;
etage1.pieces[1] = wc;
etage1.pieces[2] = cuisine;

etage2.pieces[0] = chambre;
etage2.pieces[1] = salleDeBains;

home.etages[0] = etage1;
home.etages[1] = etage2;

//lancementAction(four, cuisson, new Date(), 10);
//lancementAction(reveil, alarme, new Date(), 1);
var datatest = new Date();
datatest.setHours(datatest.getHours() +1);
//lancementAction(four, cuisson, datatest, 10);

//permet de mettre a jour les taches toutes les secondes
setInterval(generateListTasks, 1000);