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
	if(document.getElementById("detail_piece"))
		document.getElementById("myHome").removeChild(document.getElementById("myHome").lastChild);
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
	this.temp = 23; // temperature de la piece
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

var Objet = function(name, image) {
	var objet = this;
	this.name = name;
	this.image = image;
	// l'affichage dans la liste des objets
	this.display = document.createElement("p");
	this.display.style.textAlign = "center";
	var img = document.createElement("img"); 
	img.id = name;
	img.src = image;
	img.height = 128;
	img.width = 128;
	this.display.appendChild(img);
	this.display.appendChild(document.createElement("br"));
	var span = document.createElement("span");
	span.innerHTML = name;
	this.display.onclick = function(){
		affichageAction(objet);
	}
	
	this.display.appendChild(span);
	this.onOff = false; // Si l'objet est on ou off
	this.occuper = false; // Si l'objet est occupé
	this.actions = []; //action possible avec l'objet
}

var Action = function(name){
	this.name = name;
	this.time = 0; // temps de l'action
	this.dateDebut = new Date(); // debut de l'action
}

//affichage des action d'un objet 
var affichageAction = function(objet){
	var parent = document.getElementById("detail_piece");
	if(parent) parent.removeChild(parent.lastChild);
	
	// detail de l'objet
	var detail_action = document.createElement("div");
	detail_action.style.border = "3px solid black";
	detail_action.style.id = "detail_objet";
	detail_action.style.marginLeft = 10 + "%";
	detail_action.style.width = 90 + "%";
	detail_action.style.height = 71 + "%";
	detail_action.style.background = "green";
	
	//Affichage du titre
	var titre_span = document.createElement("span");
	titre_span.innerHTML = objet.name;
	
	//Pour rendre beau l'affichage 
	var caracImage_div = document.createElement("div");
	caracImage_div.id = "caracImage_piece";
	caracImage_div.style.width = 100 + "%";
	caracImage_div.style.height = 20 + "%";
	caracImage_div.style.border = "1px solid black";
	
	//Affichage de l'image
	var image_div = document.createElement("img");
	image_div.id = "image_objet";
	image_div.src = objet.image;
	image_div.style.float = "left";
	image_div.style.width = 40 + "%";
	image_div.style.height = 100 + "%";
	
	//Affichage des carac de base d'un objet 
	var carac_div = document.createElement("div");
	carac_div.id = "carac_div";
	carac_div.style.marginLeft = 40 + "%";
	carac_div.style.width = 60 + "%";
	carac_div.style.height = 100 + "%";
	carac_div.style.border = "1px solid black";
	
	//ON/OFF
	var onOff_p = document.createElement("p");
	onOff_p.style.width = 100 + "%";
	onOff_p.style.height = 20 + "%";
	var onOfflabel_p = document.createElement("label");
	onOfflabel_p.style.float = "left";
	onOfflabel_p.style.width = 40 + "%";
	onOfflabel_p.innerHTML = "Allumer :";
	var buttononOff_p = document.createElement("button");
	buttononOff_p.style.float = "left";
	buttononOff_p.style.width = 60 + "%";
	if(objet.onOff)
		buttononOff_p.innerHTML = "ON";
	else
		buttononOff_p.innerHTML = "OFF";
	buttononOff_p.onclick = function(){
		objet.onOff = !objet.onOff;
		if(objet.onOff)
			buttononOff_p.innerHTML = "ON";
		else
			buttononOff_p.innerHTML = "OFF";
		
		alert("Votre " + objet.name + " est bien " + buttononOff_p.innerHTML + "!");
		//MAJ du plan
		//home.etages[home.selectEtage].affichage();
	}
	
	onOff_p.appendChild(onOfflabel_p);
	onOff_p.appendChild(buttononOff_p);	
	carac_div.appendChild(onOff_p);
	
	//Statut
	var statut_p = document.createElement("p");
	statut_p.style.width = 100 + "%";
	statut_p.style.height = 20 + "%";
	var statutlabel_p = document.createElement("label");
	statutlabel_p.style.float = "left";
	statutlabel_p.style.width = 100 + "%";
	statutlabel_p.innerHTML = "Etat : ";
	if(objet.occuper)
		statutlabel_p.innerHTML += "Indisponible";
	else
		statutlabel_p.innerHTML += "Disponible";
	
	
	//Affichage des actions
	
	
	statut_p.appendChild(statutlabel_p);
	carac_div.appendChild(statut_p);
	
	caracImage_div.appendChild(image_div);
	caracImage_div.appendChild(carac_div);
	
	detail_action.appendChild(titre_span);
	detail_action.appendChild(caracImage_div);
	//detail_action.appendChild(planaction_div);
	//detail_action.appendChild(objetlist_div);
	
	parent.appendChild(detail_action);
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
	if(document.getElementById("detail_piece"))
		document.getElementById("myHome").removeChild(document.getElementById("myHome").lastChild);
		
	//div principal de l'affichage
	var detail_div = document.createElement("div");
	detail_div.id = "detail_piece";
	detail_div.style.marginLeft = 10 + "%";
	detail_div.style.width = 80 + "%";
	detail_div.style.height = 80 + "%";
	detail_div.style.background = "gray";
	detail_div.style.opacity = 80 + "%";
	detail_div.style.position = "absolute";
  
	//Affichage du titre
	var titre_span = document.createElement("span");
	titre_span.height = 10 + "%";
	titre_span.innerHTML = doc.name;
  
	//Div avec mini plan + action de la piece
	var planaction_div = document.createElement("div");
	planaction_div.id = "planAction_piece";
	planaction_div.style.width = 100 + "%";
	planaction_div.style.height = 20 + "%";
	
	// mini plan
	//TODO A FAIRE 
	var miniplan_div = document.createElement("div");
	miniplan_div.id = "miniplan_piece";
	miniplan_div.style.float = "left";
	miniplan_div.style.width = 40 + "%";
	miniplan_div.style.height = 100 + "%";
	miniplan_div.style.background = "red";
	
	// les actions de chaque piece
	var action_div = document.createElement("div");
	action_div.id = "action_piece";
	action_div.style.marginLeft = 40 + "%";
	action_div.style.width = 60 + "%";
	action_div.style.height = 100 + "%";
	action_div.style.background = "blue";
	
	//Pour allumer la lumiere
	var light_p = document.createElement("p");
	light_p.style.width = 100 + "%";
	light_p.style.height = 20 + "%";
	var labellight_p = document.createElement("label");
	labellight_p.style.float = "left";
	labellight_p.style.width = 40 + "%";
	labellight_p.innerHTML = "Lumiere :  ";
	var buttonlight_p = document.createElement("button");
	buttonlight_p.style.float = "left";
	buttonlight_p.style.width = 60 + "%";
	if(doc.light)
		buttonlight_p.innerHTML = "Eteindre";
	else
		buttonlight_p.innerHTML = "Allumer";
	buttonlight_p.onclick = function(){
		doc.light = !doc.light;
		if(doc.light)
			buttonlight_p.innerHTML = "Eteindre";
		else
			buttonlight_p.innerHTML = "Allumer";
		alert("La lumiere de " + doc.name + " est bien " + buttonlight_p.innerHTML + "!");
		//MAJ du plan
		//home.etages[home.selectEtage].affichage();
	}
	
	light_p.appendChild(labellight_p);
	light_p.appendChild(buttonlight_p);	
	action_div.appendChild(light_p);
	
	//Pour regler la temperature
	var temp_p = document.createElement("p");
	temp_p.style.width = 100 + "%";
	temp_p.style.height = 20 + "%";
	var labeltemp_p = document.createElement("label");
	labeltemp_p.style.float = "left";
	labeltemp_p.style.width = 40 + "%";
	labeltemp_p.innerHTML = "Temperature :  ";
	var labeltempAff_p = document.createElement("label");
	labeltempAff_p.style.float = "left";
	labeltempAff_p.style.width = 12 + "%";
	labeltempAff_p.innerHTML = " " + doc.temp + "°C";
	var slidertemp_p = document.createElement("input");
	slidertemp_p.type = "range";
	slidertemp_p.min = 0;
	slidertemp_p.max = 40;
	slidertemp_p.value = doc.temp;
	slidertemp_p.style.float = "left";
	slidertemp_p.style.width = 45 + "%";
	//Permet de modifier la temperature
	slidertemp_p.onchange = function(){
		doc.temp = slidertemp_p.value;
		labeltempAff_p.innerHTML = " " + doc.temp + "°C";
	}
	
	temp_p.appendChild(labeltemp_p);
	temp_p.appendChild(slidertemp_p);
	temp_p.appendChild(labeltempAff_p);	
	action_div.appendChild(temp_p);
	
	//Pour allumer la lumiere
	var volet_p = document.createElement("p");
	volet_p.style.width = 100 + "%";
	volet_p.style.height = 20 + "%";
	var labelvolet_p = document.createElement("label");
	labelvolet_p.style.float = "left";
	labelvolet_p.style.width = 40 + "%";
	labelvolet_p.innerHTML = "Volet :  ";
	var buttonvolet_p = document.createElement("button");
	buttonvolet_p.style.float = "left";
	buttonvolet_p.style.width = 60 + "%";
	if(doc.volet)
		buttonvolet_p.innerHTML = "Fermer";
	else
		buttonvolet_p.innerHTML = "Ouvrir";
	
	buttonvolet_p.onclick = function(){
		doc.volet = !doc.volet;
		if(doc.volet)
			buttonvolet_p.innerHTML = "Fermer";
		else
			buttonvolet_p.innerHTML = "Ouvrir";
		alert("Les volets " + doc.name + " sont bien " + buttonvolet_p.innerHTML + "!");
		//MAJ du plan
		//home.etages[home.selectEtage].affichage();
	}
	
	volet_p.appendChild(labelvolet_p);
	volet_p.appendChild(buttonvolet_p);	
	action_div.appendChild(volet_p);
	
	planaction_div.appendChild(miniplan_div);
	planaction_div.appendChild(action_div);
	
	
	// Liste des objets
	var objetlist_div = document.createElement("div");
	objetlist_div.id = "listObjet_piece";
	objetlist_div.style.width = 100 + "%";
	objetlist_div.style.height = 100 + "%";
	objetlist_div.style.background = "green";
	
	doc.objets.forEach(function(element) {
		objetlist_div.appendChild(element.display);
	});
	
  detail_div.appendChild(titre_span);
  detail_div.appendChild(planaction_div);
  detail_div.appendChild(objetlist_div);
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

var four = new Objet("Four", "four.png");
var reveil = new Objet("Reveil", "reveil.png");

var cuisson = new Action("Cuisson");
var alarme = new Action("Alarme");

four.actions[0] = cuisson;
reveil.actions[0] = alarme;

chambre.objets[0] = reveil;

cuisine.objets[0] = four;

etage1.pieces[0] = chambre;
etage1.pieces[1] = wc;
etage1.pieces[2] = cuisine;

etage2.pieces[0] = chambre;
etage2.pieces[1] = salleDeBains;

home.etages[0] = etage1;
home.etages[1] = etage2;