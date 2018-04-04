var Maison = function () {
  this.selectEtage = 0;
	this.etages = []; // les etages de la maison
}

var Etage = function (name) {
  this.name = name;
	this.display = document.createElement("div");
	this.display.id = "etages";
	this.pieces = []; // les pieces de l'etage
}

//for each pour affichage d'un etage( ensemble de piece)
Etage.prototype.affichage = function(){
	var etage = this;
	document.getElementById("myHome").removeChild(document.getElementById("myHome").lastChild);
	document.getElementById("myHome").appendChild(this.display);
	this.pieces.forEach(function(element) {
		element.affichage(etage);
	});
}

var Piece = function (name, x, y, w, h) {
	this.name = name; // Nom de la piece
	this.x = x; // Position x de la piece
	this.y = y; // Position y de la piece
	this.width = w; // longueur de la piece
	this.height = h; // hauteur de la piece
	this.display = document.createElement("div");
	this.display.id = name;
	
	//Programme on click
	var piece = this;
	this.display.onclick = function(){
		affichagePiece(piece);
	}
	this.objets = []; // les objets connectees de la pieces
	
	
	this.light = false; // si les lumieres sont allumees
	this.temp = 0; // temperature de la piece
	this.volet = false; // si les volets sont ouvert ou fermer
}

Piece.prototype.affichage = function(e){
  //recupere la valeur du display parent
  var x = e.display.offsetLeft;
  var y = e.display.offsetTop;
  
	this.display.style.position = "absolute";
	this.display.style.left = (x + this.x) + "px";
	this.display.style.top = (y + this.y) + "px";
	this.display.style.width = this.width + "px";
	this.display.style.height = this.height + "px";

	if(this.light)
		this.display.style.backgroundColor = "yellow";
	else
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

//Permet d'afficher la bonne page
var affichagePage = function(doc){
	var accueil = document.getElementById("pageAccueil");
	accueil.style.display = "none";
	var myhome = document.getElementById("myHome");
	myhome.style.display = "none";
	var mytasks = document.getElementById("myTasks");
	mytasks.style.display = "none";
	document.getElementById("retour").style.display = "block";
  
	if(doc.id == "retour") doc.name = pagePrecedent;
  
	//MY HOME
	if(doc.name == "myhome"){
		//affiche les bon elements
		myhome.style.display = "block";
		var enfant = myhome.getElementsByTagName("div");
		for (var i = 0; i < enfant.length; i++) {
			enfant[i].style.display = "block";
		}
    
		var choixEtage = document.getElementById("choixEtage");
		while( choixEtage.firstChild) choixEtage.removeChild( choixEtage.firstChild);
    
		//ajoute les boutons dynamiquement a choixEtage
		var i = 0;
		home.etages.forEach(function(etage) {
		  var tmp = document.createElement("button");
		  tmp.name = "etage" + i;
		  tmp.id = "boutonsEtages";
		  tmp.innerHTML = etage.name;
		  tmp.onclick = function(){
		    home.selectEtage = tmp.name.substring(5, 6);
		    home.etages[home.selectEtage].affichage();
		  };
		  choixEtage.appendChild(tmp);
		  i++;
	  });
	  home.etages[home.selectEtage].affichage();
	}
	
	// My TASKS
  if(doc.name == "mytasks"){
    //affiche les bon elements
	  mytasks.style.display = "block";
	  var enfant = mytasks.getElementsByTagName("Div");
    for (var i = 0; i < enfant.length; i++) {
      enfant[i].style.display = "block";
    }
  }
  
  // Page Accueil
  if(doc.name == "pageAccueil"){
    //affiche les bon elements
    document.getElementById("retour").style.display = "none";
	  accueil.style.display = "block";
	  var enfant = accueil.getElementsByTagName("Div");
    for (var i = 0; i < enfant.length; i++) {
      enfant[i].style.display = "block";
    }
  }
  
}

//creation automatique et affiche la div des pieces.
var affichagePiece = function(doc){
	//div principal de l'affichage
	var detail_div = document.createElement("div");
	detail_div.id = "detail_piece";
	detail_div.style.marginLeft = 10 + "%";
	detail_div.style.width = 80 + "%";
	detail_div.style.height = 80 + "%";
	detail_div.style.background = "white";
	detail_div.style.position = "absolute";
  
  //Affichage du titre
  var titre_span = document.createElement("span");
  titre_span.innerHTML = doc.name;
  
  //Div avec mini plan + action de la piece
  var planaction_div = document.createElement("div");
  planaction_div.id = "planAction_piece";
  planaction_div.style.width = 100 + "%";
	planaction_div.style.height = 20 + "%";
	
	// mini plan
	var miniplan_div = document.createElement("div");
  miniplan_div.id = "planAction_piece";
  miniplan_div.style.float = "left";
  miniplan_div.style.width = 40 + "%";
	miniplan_div.style.height = 100 + "%";
	miniplan_div.style.background = "red";
	// les actions de chaque piece
	var action_div = document.createElement("div");
  action_div.id = "planAction_piece";
  action_div.style.marginLeft = 40 + "%";
  action_div.style.width = 60 + "%";
	action_div.style.height = 100 + "%";
	action_div.style.background = "blue";
	
	planaction_div.appendChild(miniplan_div);
	planaction_div.appendChild(action_div);
	
  detail_div.appendChild(titre_span);
  detail_div.appendChild(planaction_div);
  document.getElementById("myHome").appendChild(detail_div);
}

// Variable globale
var pagePrecedent = "pageAccueil";


// Simule la recuperation des données de bases de la maison
var home = new Maison();

var etage1 = new Etage("1er Etage");
var etage2 = new Etage("2eme Etage");

var chambre = new Piece("Chambre", 0,0,210,100);
var wc = new Piece("wc", 110,110,100,100);
var cuisine = new Piece("cuisine", 0,110,100,100);
var salleDeBains = new Piece("salle de bain", 50, 105, 100, 75);

etage1.pieces[0] = chambre;
etage1.pieces[1] = wc;
etage1.pieces[2] = cuisine;

etage2.pieces[0] = chambre;
etage2.pieces[1] = salleDeBains;

home.etages[0] = etage1;
home.etages[1] = etage2;