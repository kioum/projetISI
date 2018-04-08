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

var Objet = function(piece, name, image) {
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
		affichageObjet(piece, objet);
	}

	this.display.appendChild(span);
	this.onOff = false; // Si l'objet est on ou off
	this.occuper = false; // Si l'objet est occupé
	this.actions = []; //action possible avec l'objet
	this.actionActuel;
}

var Action = function(name){
	this.name = name;
	this.time = 0; // temps de l'action
	this.dateDebut; // debut de l'action
}

Action.prototype.progression = function(){
	return 50;
}

//affichage des action d'un objet 
var affichageObjet = function(piece, objet){
	var parent = document.getElementById("detail_piece");
	if(parent) parent.removeChild(parent.lastChild);

	// detail de l'objet, div générale
	var detail_action = document.createElement("div");
	detail_action.id = "detail_objet";
	detail_action.style.border = "3px solid black";
	//detail_action.style.marginLeft = 10 + "%";
	//detail_action.style.width = 90 + "%";
	//detail_action.style.height = 71 + "%";
	//detail_action.style.background = "green";

	//Affichage du titre
	var titre_span = document.createElement("div");
	titre_span.style.width = 100 + "%";
	titre_span.style.height = 10 + "%";
	titre_span.innerHTML = objet.name;
	detail_action.style.border = "1px solid yellow";
	detail_action.appendChild(titre_span);

	/*//Pour rendre beau l'affichage 
	var caracImage_div = document.createElement("div");
	caracImage_div.id = "caracImage_piece";
	caracImage_div.style.width = 40 + "%";
	caracImage_div.style.height = 100 + "%";
	caracImage_div.style.border = "1px solid red";*/

	//Affichage de l'image div dans laquelle est l'image
	var image_div = document.createElement("img");
	image_div.id = "image_objet";
	image_div.src = objet.image;
	image_div.style.float = "left";
	image_div.style.width = 40 + "%";
	image_div.style.height = 90 + "%";
	image_div.style.border = "1px solid red";
	detail_action.appendChild(image_div);

	//Div des paramètre objet
	var pObj_div = document.createElement("div");
	pObj_div.id = "param_Obj";
	pObj_div.style.width = 60 + "%";
	pObj_div.style.height = 90 + "%";
	pObj_div.style.border = "1px solid white";
	image_div.style.float = "right";
	detail_action.appendChild(pObj_div);

	//Affichage des carac de base d'un objet 
	var carac_div = document.createElement("div");
	carac_div.id = "carac_div";
	carac_div.style.marginLeft = 40 + "%";
	carac_div.style.width = 50 + "%";
	carac_div.style.height = 10 + "%";
	carac_div.style.border = "1px solid blue";
	pObj_div.appendChild(carac_div);

	//ON/OFF
	var onOff_p = document.createElement("p");
	onOff_p.style.width = 100 + "%";
	onOff_p.style.height = 10 + "%";

	//label
	var onOfflabel_p = document.createElement("label");
	onOfflabel_p.style.float = "left";
	onOfflabel_p.style.width = 40 + "%";
	onOfflabel_p.innerHTML = "Allumer :";
	onOff_p.appendChild(onOfflabel_p);

	//button
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
	onOff_p.appendChild(buttononOff_p);	
	pObj_div.appendChild(onOff_p);

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
	statut_p.appendChild(statutlabel_p);
	carac_div.appendChild(statut_p);


	//Affichage des actions
	if(!objet.occuper){
		var listAction = document.createElement("div");		
		listAction.style.border = "1px solid purple";
		listAction.style.width = 30 + "%";
		objet.actions.forEach(function(element) {
			var div_action = document.createElement("div");


			var span_action = document.createElement("span");
			span_action.innerHTML = element.name + " :" ;
			span_action.style.float = "left";

			var buttonDetail = document.createElement("button");
			buttonDetail.innerHTML = "+";
			buttonDetail.style.marginLeft = "auto";
			buttonDetail.style.width = 5 + "%";
			buttonDetail.onclick = function(){
				if(buttonDetail.innerHTML == "+"){
					affichageAction(piece, objet, element, div_action);
					buttonDetail.innerHTML = "-";
				}else if(buttonDetail.innerHTML == "-"){
					div_action.removeChild(div_action.lastChild);
					buttonDetail.innerHTML = "+";
				}
			}
			//span_action.style.float = "right";

			div_action.appendChild(span_action);
			div_action.appendChild(buttonDetail);
			listAction.appendChild(div_action);			
			console.log(element);
		});
	}
	//caracImage_div.appendChild(image_div);
	//detail_action.appendChild(carac_div);

	if(!objet.occuper)
		detail_action.appendChild(listAction);
	//detail_action.appendChild(planaction_div);
	//detail_action.appendChild(objetlist_div);
	pObj_div.appendChild(listAction);
	parent.appendChild(detail_action);
}

var affichageAction = function(p, o, action, display){
	action.dateDebut = new Date();
	var div_action = document.createElement("div");	
	div_action.style.marginLeft = 10 + "%";

	var p_dateDebut = document.createElement("p");
	var date_dateDebut = document.createElement("input");
	date_dateDebut.type = "date";
	date_dateDebut.value = action.dateDebut.getFullYear()+"-0"+ 
	(action.dateDebut.getMonth()+1) + "-0" + action.dateDebut.getDate();
	var span_dateDebut = document.createElement("span");
	span_dateDebut.innerHTML = "Date de debut : ";
	p_dateDebut.appendChild(span_dateDebut);
	p_dateDebut.appendChild(date_dateDebut);

	var p_hDebut = document.createElement("p");
	var span_hDebut = document.createElement("span");
	span_hDebut.innerHTML = "Heure de debut : ";
	var heure_hDebut = document.createElement("input");
	heure_hDebut.value = action.dateDebut.getHours();
	heure_hDebut.id = "heure";
	heure_hDebut.style.width = 5 + "%";
	heure_hDebut.onchange = function(){
		maxLength(heure_hDebut, 2);
	}
	var labelheure_hDebut = document.createElement("label");
	labelheure_hDebut.innerHTML = " h ";
	var labelminute_hDebut = document.createElement("label");
	labelminute_hDebut.innerHTML = " min";
	var minute_hDebut = document.createElement("input");
	minute_hDebut.value = action.dateDebut.getMinutes();
	minute_hDebut.id = "minute";
	minute_hDebut.style.width = 5 + "%";
	minute_hDebut.onchange = function(){
		maxLength(minute_hDebut, 2);
	}
	p_hDebut.appendChild(span_hDebut);
	p_hDebut.appendChild(heure_hDebut);
	p_hDebut.appendChild(labelheure_hDebut);
	p_hDebut.appendChild(minute_hDebut);
	p_hDebut.appendChild(labelminute_hDebut);

	var p_tempsExecution = document.createElement("p");
	var span_tempsExecution = document.createElement("span");
	span_tempsExecution.innerHTML = "Temps d'execution: ";
	var heure_tempsExecution = document.createElement("input");
	heure_tempsExecution.id = "heure";
	heure_tempsExecution.value = 0;
	heure_tempsExecution.style.width = 5 + "%";
	heure_tempsExecution.onchange = function(){
		maxLength(heure_tempsExecution, 2);
	}
	var minute_tempsExecution = document.createElement("input");
	minute_tempsExecution.style.width = 5 + "%";
	minute_tempsExecution.id = "minute";
	minute_tempsExecution.value = 0;
	minute_tempsExecution.onchange = function(){
		maxLength(minute_tempsExecution, 2);
	}
	var labelheure_tempsExecution = document.createElement("label");
	labelheure_tempsExecution.innerHTML = " h ";
	var labelminute_tempsExecution = document.createElement("label");
	labelminute_tempsExecution.innerHTML = " min ";

	p_tempsExecution.appendChild(span_tempsExecution);
	p_tempsExecution.appendChild(heure_tempsExecution);
	p_tempsExecution.appendChild(labelheure_tempsExecution);
	p_tempsExecution.appendChild(minute_tempsExecution);
	p_tempsExecution.appendChild(labelminute_tempsExecution);

	var p_valider = document.createElement("p");
	var button_valider = document.createElement("button");
	button_valider.innerHTML = "Lancer l'action : '" + action.name + "'";
	button_valider.onclick = function(){
		lancementAction(p, o, action, action.dateDebut);
	}

	p_valider.appendChild(button_valider);

	div_action.appendChild(p_dateDebut);
	div_action.appendChild(p_hDebut);
	div_action.appendChild(p_tempsExecution);
	div_action.appendChild(p_valider);
	display.appendChild(div_action);
}

function listObjet(doc) {
	// Liste des objets
	var objetlist_div = document.createElement("div");
	objetlist_div.id = "listObjet_piece";
	/*objetlist_div.style.width = 100 + "%";
	objetlist_div.style.height = 100 + "%";
	objetlist_div.style.background = "green";*/

	doc.objets.forEach(function(element) {
		tmp = element.display;
		objetlist_div.appendChild(tmp);
		tmp.style.float = "left";
	});
	return objetlist_div;
}

function lancementAction(p, o, a,d){
	var parent = document.getElementById("detail_objet");
	if(parent) parent.removeChild(parent.lastChild);
	document.getElementById("detail_piece").appendChild(listObjet(p));

	var new_action = new Action(a.name);

	o.actionActuel = new_action;
}
//Fonction servant à limiter le nombre de caractere  dans une textarea
function maxLength(element, max){
	value = parseInt(element.value);
	console.log(element.id);
	if(element.id == "heure"){
		if(value > 24) element.value = 24;
		if(value < 0) element.value = 0;
	}
	if(element.id == "minute")
		if(value > 60) element.value = 60;
	if(value < 0) element.value = 0;
	max = parseInt(max);
	if(value.length > max){
		element.value = value.substr(0, max);
	}
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
			tmp.setAttribute('class', "btn btn-secondary btn-sm");
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
	/*detail_div.style.marginLeft = 10 + "%";
	detail_div.style.width = 80 + "%";
	detail_div.style.height = 80 + "%";
	detail_div.style.background = "gray";
	detail_div.style.opacity = 80 + "%";
	detail_div.style.position = "absolute";*/


	//Affichage du titre
	var titre_span = document.createElement("div");
	titre_span.id = "Nom_piece";
	titre_span.innerHTML = doc.name;
	/*titre_span.height = 10 + "%";*/

	//bouton fermer
	var buttonclose = document.createElement("button");
	buttonclose.id = "close";
	buttonclose.setAttribute('class', "btn btn-danger");
	//buttonclose.innerHTML = '<img src="Icone/fermer.png" width="20" height="20" margin-left = "0"/>';;
	buttonclose.onclick = function(){

	};
	titre_span.appendChild(buttonclose);

	//Div avec mini plan + action de la piece
	var planaction_div = document.createElement("div");
	planaction_div.id = "planAction_piece";
	planaction_div.style.width = 100 + "%";
	planaction_div.style.height = 20 + "%";

	// mini plan
	//TODO A FAIRE 
	var miniplan_div = document.createElement("div");
	miniplan_div.id = "miniplan_piece";
	/*miniplan_div.style.float = "left";
	miniplan_div.style.width = 40 + "%";
	miniplan_div.style.height = 100 + "%";
	miniplan_div.style.background = "red";*/

	// les actions de chaque piece
	var action_div = document.createElement("div");
	action_div.id = "action_piece";
	/*action_div.style.marginLeft = 40 + "%";
	action_div.style.width = 60 + "%";
	action_div.style.height = 100 + "%";
	action_div.style.background = "blue";*/

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

	detail_div.appendChild(titre_span);
	detail_div.appendChild(planaction_div);
	detail_div.appendChild(listObjet(doc));
	document.getElementById("myHome").appendChild(detail_div);
}



//Variable globale
var pagePrecedent = "pageAccueil";

//Simule la recuperation des données de bases de la maison
var home = new Maison();

var etage1 = new Etage("1er Etage");
var etage2 = new Etage("2eme Etage");

var chambre = new Piece("Chambre", 0,0,210,100);
var wc = new Piece("Toilettes", 110,110,100,100);
var cuisine = new Piece("Cuisine", 0,110,100,100);
var salleDeBains = new Piece("Salle de bain", 50, 105, 100, 75);

var four = new Objet(cuisine, "Four", "four.png");
var reveil = new Objet(chambre, "Reveil", "reveil.png");
var frigo = new Objet(cuisine, "Frigo", "Icone/fridge.png");

var cuisson = new Action("Cuisson");
var alarme = new Action("Alarme");

four.actions[0] = cuisson;
reveil.actions[0] = alarme;

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