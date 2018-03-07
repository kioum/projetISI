var Maison = function () {
	this.etages = []; // les etages de la maison
}

var Etage = function () {
	this.display = document.createElement("div");
	this.display.id = "ici c'est un etage lol";
	this.display.style.width = 1000 + "px";
	this.display.style.height = 1000 + "px";
	this.display.style.backgroundColor = "grey";
	this.pieces = []; // les pieces de l'etage
}

//for each pour affichage d'un etage( ensemble de piece)
Etage.prototype.affichage = function(){
	var etage = this;
	this.pieces.forEach(function(element) {
		element.affichage(etage);
	});
	document.body.appendChild(this.display);
}
var Piece = function (name, x, y, w, h) {
	this.name = name; // Nom de la piece
	this.x = x; // Position x de la piece
	this.y = y; // Position y de la piece
	this.width = w; // longueur de la piece
	this.height = h; // hauteur de la piece
	this.display = document.createElement("div");
	this.display.id = name;
	this.objets = []; // les objets connectees de la pieces
	
	
	this.light = false; // si les lumieres sont allumees
	this.temp = 0; // temperature de la piece
	this.volet = false; // si les volets sont ouvert ou fermer
}

Piece.prototype.affichage = function(e){
	this.display.style.position = "absolu";
	this.display.style.left = this.x + "px";
	this.display.style.top = this.y + "px";
	this.display.style.width = this.width + "px";
	this.display.style.height = this.height + "px";

	this.display.style.backgroundColor = "black";
	e.display.appendChild(this.display);
}

var Objet = function() {
	this.actions = []; //action possible avec l'objet
}

var Action = function(){
	this.time = 0; // temps de l'action
	this.dateDebut; // debut de l'action
	this.onOff = false; // Si l'objet est on ou off
}

// Simule la recuperation des données de bases de la maison
var home = new Maison();

var etage1 = new Etage();

var chambre = new Piece("Chambre", 0,0,200,100);
var wc = new Piece("wc", 100,110,100,100);
var cuisine = new Piece("cuisine", 0,110,100,100);

etage1.pieces[0] = chambre;
etage1.pieces[1] = wc;
etage1.pieces[2] = cuisine;
home.etages[0] = etage1;




























































































































console.log("fatal error");