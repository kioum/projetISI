var Maison = function () {
  this.selectEtage = 0;
  this.etages = []; // les etages de la maison
  this.actions = []; // les actions fait dans la maison
}

var Etage = function (name) {
	this.name = name;
	this.display = document.createElement("div");
	this.display.id = "etages";
	this.display.name = name;
	this.pieces = []; // les pieces de l'etage
}

//for each pour affichage d'un etage( ensemble de piece)
Etage.prototype.affichage = function(){
	var etage = this;
  if(document.getElementById("detail_piece"))
		document.getElementById("myHome").removeChild(document.getElementById("detail_piece"));
	if(document.getElementById("etages"))
  	document.getElementById("myHome").removeChild(document.getElementById("etages"));
	document.getElementById("myHome").appendChild(this.display);
	this.pieces.forEach(function(element) {
		element.affichage(etage);
	});
}

//for each pour affichage d'un etage( ensemble de piece)
Etage.prototype.majAffichage = function(){
	this.pieces.forEach(function(element) {
		element.affichage();
	});
}

//for each pour affichage d'un etage( ensemble de piece)
Etage.prototype.miniDisplay = function(parent, name){
	var etage = this;
	this.pieces.forEach(function(element) {
	  if (document.getElementById("mini_"+element.name+etage.name)){
	      var new_div = document.getElementById("mini_"+element.name+etage.name);
	  }
	  if(parent){
	    var new_div = document.createElement("div");
	    new_div.id = "mini_"+element.name+etage.name;
	    new_div.onclick = element.display.onclick;
	    var x_mini = ((element.x)/etage.display.offsetWidth) * parent.offsetWidth;
	    var y_mini = ((element.y)/etage.display.offsetHeight) * parent.offsetHeight;
	  
	    new_div.style.position = "absolute";
	    if(element.name == name)
	      new_div.style.border ="3px solid red";
	    new_div.style.left = x_mini + "px";
	    new_div.style.top = y_mini + "px";
	    new_div.style.width = (parent.offsetWidth/etage.display.offsetWidth) * element.width + "px";
	    new_div.style.height = (parent.offsetHeight/etage.display.offsetWidth) * element.height + "px";

		var span_titre = document.createElement("span");
		span_titre.id = "mini_span"+element.name;
		span_titre.innerHTML = element.name;
		//
		if(element.light) span_titre.style.color = "black";
		else span_titre.style.color = "white";
		if(!document.getElementById("mini_span"+element.name))
			new_div.appendChild(span_titre);
		}
	
		if (document.getElementById("mini_"+element.name+etage.name) || parent)
			if(element.light){
				new_div.style.background = "yellow";
				if (document.getElementById("span_mouseover"+element.name))
					document.getElementById("span_mouseover"+element.name).style.color = "black";
				if (document.getElementById("mini_span"+element.name))
					document.getElementById("mini_span"+element.name).style.color = "black";
			}
			else{
				new_div.style.background = "black";
				if (document.getElementById("span_mouseover"+element.name))
					document.getElementById("span_mouseover"+element.name).style.color = "white";
				if (document.getElementById("mini_span"+element.name))
					document.getElementById("mini_span"+element.name).style.color = "white";
			}
		  
	if(parent)
		parent.appendChild(new_div);
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
	var span_titre = document.createElement("span");
	span_titre.id = "span_mouseover" +name;
	span_titre.innerHTML = name;
	span_titre.innerHTML = name;
	span_titre.style.color = "White";
	  	
	this.display.onmouseover = function(){	 
		span_titre.style.color = "black";
		piece.display.style.background = "white";
	}
	
	this.display.onmouseout = function(){
	  if(piece.light){
		piece.display.style.backgroundColor = "yellow";
		span_titre.style.color = "black";
	  }
	  else {
		 piece.display.style.backgroundColor = "black";
		 span_titre.style.color = "white";
	  }
	}
	  
	this.objets = []; // les objets connectees de la pieces
	this.light = false; // si les lumieres sont allumees
	this.temp = 23; // temperature de la piece
	this.volet = false; // si les volets sont ouvert ou fermer
	
	this.display.appendChild(span_titre);
}

Piece.prototype.affichage = function(e){
	//recupere la valeur du display parent
	if(e){
	 this.display.id = this.name+e.name;
	}
	
	this.display.style.position = "absolute";
	this.display.style.left = (this.x) + "px";
	this.display.style.top = (this.y) + "px";
	this.display.style.width = this.width + "px";
	this.display.style.height = this.height + "px";
	this.display.style.marginLeft = 45 + "px";
	this.display.style.marginTop = 45 + "px";
	
	if(this.light){
	  this.display.style.backgroundColor = "yellow";
	  if (document.getElementById("mini_span"+this.name))
		document.getElementById("mini_span"+this.name).style.color = "black";
	  if (document.getElementById("span_mouseover"+this.name))
		document.getElementById("span_mouseover"+this.name).style.color = "black";
	}
	else{
	  this.display.style.backgroundColor = "black";
	  if (document.getElementById("mini_span"+this.name))
		document.getElementById("mini_span"+this.name).style.color = "white";
	  if (document.getElementById("span_mouseover"+this.name))
		document.getElementById("span_mouseover"+this.name).style.color = "white";
	}		
		
	if(e)
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
}

var Action = function(piece, name, param, param_unit){
	this.name = name;
	this.piece = piece.name;
	this.time = 0; // temps de l'action
	this.dateDebut; // debut de l'action
	this.etat = 0; // 0 = Pas lancé, 1 = en cours, 2 bien fini, -1 annulé
	if(param){
	  this.param1_name = param;
	  this.param1;
	  this.param1_unit = param_unit;
	}
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
	titre_span.id = "nomObj";
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
	//image_div.style.height = 90 + "%";
	//image_div.style.border = "1px solid red";
	detail_action.appendChild(image_div);

	//Div des paramètre objet
	var pObj_div = document.createElement("div");
	pObj_div.id = "param_Obj";
	pObj_div.style.width = 60 + "%";
	pObj_div.style.height = 90 + "%";
	//pObj_div.style.border = "1px solid white";
	image_div.style.float = "right";
	detail_action.appendChild(pObj_div);

	//Affichage des carac de base d'un objet 
	var carac_div = document.createElement("div");
	carac_div.id = "carac_div";
	carac_div.style.float = "left";
	carac_div.style.float = "left";
	//carac_div.style.marginLeft = 40 + "%";
	carac_div.style.width = 100 + "%";
	carac_div.style.height = 20 + "%";
	carac_div.style.marginTop = 20 + "px";
	carac_div.style.position = "relative";
	//carac_div.style.border = "1px solid blue";
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
	buttononOff_p.style.width = 40 + "%";
	buttononOff_p.setAttribute('class', "btn btn-light btn-sm");
	if(objet.onOff)
		buttononOff_p.innerHTML = "ON";
	else
		buttononOff_p.innerHTML = "OFF";
	buttononOff_p.onclick = function(){
		objet.onOff = !objet.onOff;

		alert("Votre " + objet.name + " est bien " + buttononOff_p.innerHTML + "!");	
		if(objet.onOff)
			buttononOff_p.innerHTML = "ON";
		else
			buttononOff_p.innerHTML = "OFF";
		//MAJ du plan
		home.etages[home.selectEtage].majAffichage();
		home.etages[home.selectEtage].miniDisplay();
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
		//listAction.style.border = "1px solid purple";
		listAction.style.position = "relative";
		listAction.style.width = 100 + "%";
		listAction.style.height = 20 + "%";
		objet.actions.forEach(function(element) {
			var div_action = document.createElement("div");
			
			var span_action = document.createElement("div");
			span_action.innerHTML = element.name + " :" ;  
			span_action.style.position = "relative";
			span_action.style.marginTop = 10 + "px";
			span_action.style.width = 100 + "%";
			span_action.style.height = 20 + "%";
			//span_action.style.border = "1px solid pink";
			span_action.style.float = "left";
			
			var buttonDetail = document.createElement("button");
			buttonDetail.innerHTML = "+";
			//buttonDetail.style.marginLeft = "auto";
			buttonDetail.style.width = 10 + "%";
			buttonDetail.style.height = 35 + "px";
			buttonDetail.style.marginLeft = 85 + "px";
			buttonDetail.setAttribute('class', "btn btn-light btn-sm");
			div_action.onclick = function(){
				if(buttonDetail.innerHTML == "+"){
						span_action.appendChild(affichageAction(piece, element));
					buttonDetail.innerHTML = "-";
				}else if(buttonDetail.innerHTML == "-"){
					span_action.removeChild(span_action.lastChild);
					buttonDetail.innerHTML = "+";
				}
			}
			//span_action.style.float = "right";

			div_action.appendChild(span_action);
			span_action.appendChild(buttonDetail);
			//listAction.appendChild(div_action);	
			pObj_div.appendChild(div_action);
			console.log(element);
		});
	}
	//caracImage_div.appendChild(image_div);
	//detail_action.appendChild(carac_div);

	if(!objet.occuper)
	//detail_action.appendChild(listAction);
	//detail_action.appendChild(planaction_div);
	//detail_action.appendChild(objetlist_div);
	pObj_div.appendChild(listAction);
	parent.appendChild(detail_action);
}

var affichageAction = function(p, action){
	if(!action.dateDebut)
		action.dateDebut = new Date();
	var div_action = document.createElement("div");
	div_action.style.marginLeft = 10 + "%";
	//div_action.style.marginTop = 0 + "%";
	//div_action.style.backgroundColor = "White";
	div_action.id = "detail_act"
	div_action.onclick = function(event){event.stopPropagation();}
	
	//Date de depart
	var p_dateDebut = document.createElement("p");
	var date_dateDebut = document.createElement("input");
	date_dateDebut.min = action.dateDebut.getFullYear()+"-0"+ 
	(action.dateDebut.getMonth()+1) + "-0" + action.dateDebut.getDate();
	date_dateDebut.type = "date";
	date_dateDebut.value = action.dateDebut.getFullYear()+"-0"+ 
	(action.dateDebut.getMonth()+1) + "-0" + action.dateDebut.getDate();
	var span_dateDebut = document.createElement("span");
	span_dateDebut.innerHTML = "Date de debut : ";
	p_dateDebut.appendChild(span_dateDebut);
	p_dateDebut.appendChild(date_dateDebut);
	
	//Heure de depart
	var p_hDebut = document.createElement("p");
	var span_hDebut = document.createElement("span");
	span_hDebut.innerHTML = "Heure de debut : ";
	var heure_hDebut = document.createElement("input");
	heure_hDebut.value = action.dateDebut.getHours();
	heure_hDebut.id = "heure";
	heure_hDebut.style.width = 10 + "%";
	heure_hDebut.onchange = function(){
		maxLength(heure_hDebut, 2);
	}
	var labelheure_hDebut = document.createElement("label");
	labelheure_hDebut.innerHTML = " H ";
	//labelheure_hDebut.style.color= " white ";
	var labelminute_hDebut = document.createElement("label");
	labelminute_hDebut.innerHTML = " min";
	var minute_hDebut = document.createElement("input");
	minute_hDebut.value = action.dateDebut.getMinutes();
	minute_hDebut.id = "minute";
	minute_hDebut.style.marginLeft = 5 + "px";
	minute_hDebut.style.width = 7 + "%";
	minute_hDebut.onchange = function(){
		maxLength(minute_hDebut, 2);
	}
	p_hDebut.appendChild(span_hDebut);
	p_hDebut.appendChild(heure_hDebut);
	p_hDebut.appendChild(labelheure_hDebut);
	p_hDebut.appendChild(minute_hDebut);
	p_hDebut.appendChild(labelminute_hDebut);
	
	// temps de la tache 
	var p_tempsExecution = document.createElement("p");
	var span_tempsExecution = document.createElement("span");
	span_tempsExecution.innerHTML = "Temps d'execution: ";
	var heure_tempsExecution = document.createElement("input");
	heure_tempsExecution.value = 0;
	heure_tempsExecution.style.width = 7 + "%";
	heure_tempsExecution.onchange = function(){
		maxLength(heure_tempsExecution, 3);
	}
	var minute_tempsExecution = document.createElement("input");
	minute_tempsExecution.style.width = 5 + "%";
	if(p)
		minute_tempsExecution.value = 1;
	else
		minute_tempsExecution.value = action.time;
		
	minute_tempsExecution.onchange = function(){
		maxLength(minute_tempsExecution, 3);
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
	
	if(action.param1_name){
	   //Date de depart
	  var p_param1 = document.createElement("p");
	  var input_param1 = document.createElement("input");
	  //date_dateDebut.type = "date";
	  if(!action.param1)
	    input_param1.value = 0;
	 else
	    input_param1.value = action.param1;
	  var span_param1 = document.createElement("span");
	  span_param1.innerHTML = action.param1_name + " : ";
	  var span_param1_unit = document.createElement("span");
	  span_param1_unit.innerHTML = action.param1_unit;
	  
	  p_param1.appendChild(span_param1);
	  p_param1.appendChild(input_param1);
	  p_param1.appendChild(span_param1_unit);
	}
 
	
	var p_valider = document.createElement("p");
	var button_valider = document.createElement("button");
	if(p){
		button_valider.innerHTML = "Lancer l'action : '" + action.name + "'";
		button_valider.onclick = function(){
			let date = new Date(date_dateDebut.value);
			
			date.setHours(heure_hDebut.value);
			date.setMinutes(minute_hDebut.value);
			
			if(action.param1_name)
			  action.param1 = input_param1.value;
input_param1
			let temps = parseInt(heure_tempsExecution.value*60) + parseInt(minute_tempsExecution.value);
			lancementAction(p, action, date, temps);
		}
	}else {
		button_valider.innerHTML = "Modifier l'action : '" + action.name + "'";
		button_valider.onclick = function(){
			if(confirm("Etes-vous sur de vouloir modifier cette tache : " + action.name)){
				document.getElementById("tachesProg").removeChild(
					document.getElementById(action.name+action.dateDebut+action.time));
				let date = new Date(date_dateDebut.value);
				date.setHours(heure_hDebut.value);
				date.setMinutes(minute_hDebut.value);

				let tmp = home.actions[home.actions.indexOf(action)];
				tmp.dateDebut = date;

				let temps = parseInt(heure_tempsExecution.value*60) + parseInt(minute_tempsExecution.value);
				tmp.time = temps;
			}
			if(document.getElementById("current_modif"))
				document.getElementById("myTasks").removeChild(document.getElementById("current_modif"));
		}
	}
	p_valider.appendChild(button_valider);
	
	div_action.appendChild(p_dateDebut);
	div_action.appendChild(p_hDebut);
	if(p_param1)
	  div_action.appendChild(p_param1);
	div_action.appendChild(p_tempsExecution);
	div_action.appendChild(p_valider);
	return div_action;
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

// Permet de lancer une action
function lancementAction(p,a,d, t){
	var parent = document.getElementById("detail_piece");
	if(parent) {
		parent.removeChild(parent.lastChild);
		document.getElementById("detail_piece").appendChild(listObjet(p));
	}
	
	if (confirm("Etes-vous sur de vouloir créer une nouvelle action " + a.name + " ?")) {
		let new_action = new Action(p, a.name);
		new_action.dateDebut = d;
		new_action.time = t;
		new_action.param1_name = a.param1_name;
		new_action.param1 = a.param1;
		new_action.param1_unit = a.param1_unit;
		home.actions.push(new_action);
		alert("L'action a bien été enregistrée");
	} else {
		alert("L'action a bien été annulée");
	}
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

  if (doc.id == "retour" && doc.name == "myhome") doc.name = "pageAccueil";
	else if(doc.id == "retour") doc.name = pagePrecedent;

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
	  if(doc.id == "bParam") pagePrecedent = "myhome";
		//affiche les bon elements
		mytasks.style.display = "block";
		var enfant = mytasks.getElementsByTagName("Div");
		for (var i = 0; i < enfant.length; i++) {
			enfant[i].style.display = "block";
		}
	}

	// Page Accueil
	if(doc.name == "pageAccueil"){
	  pagePrecedent = "pageAccueil";
		//affiche les bon elements
		document.getElementById("retour").style.display = "none";
		accueil.style.display = "block";
		var enfant = accueil.getElementsByTagName("Div");
		for (var i = 0; i < enfant.length; i++) {
			enfant[i].style.display = "block";
		}
	}

}

//Genere les listes des taches 
var generateListTasks = function(){
	var actionEnCours = document.getElementById("tachesCours");
	var actionProg = document.getElementById("tachesProg");
	var actionFini = document.getElementById("tachesFinies");
	home.actions.forEach(function(a){
		//creer l'id de l'action en question
		var id = a.name+a.dateDebut+a.time;
		
		//Option d'affichage des date
		var options = {  
		weekday: "short", year: "numeric", month: "short",  
		day: "numeric", hour: "2-digit", minute: "2-digit"  
		};  
		
		//Changement d'etat des taches
		var dateD = a.dateDebut;
		var dateF = new Date(dateD.valueOf());
		dateF.setMinutes(dateF.getMinutes() + a.time);
		
		if(dateD <= new Date() && dateF >= new Date() && a.etat == 0) {
			a.etat = 1
			if(document.getElementById(id))
				actionProg.removeChild(document.getElementById(id));
		};
		
		if(dateF < new Date() && a.etat == 1) {
			a.etat = 2;
			actionEnCours.removeChild(document.getElementById(id));
		};
		

		if(!document.getElementById(id)){
			var new_action_cours = document.createElement("li");
			new_action_cours.id = id;
			
			//Affichage du titre
			var name_span = document.createElement("span");
			name_span.innerHTML = a.name + " (" + a.piece + ")" + " : ";
			name_span.style.width = 25 + "%";
			name_span.style.float = "left";
			name_span.id = id+"_name";
				
			var dateFin_span = document.createElement("span");
			dateFin_span.style.marginLeft = 60 + "%";
			dateFin_span.style.width = 40 + "%";
			dateFin_span.style.float = "left";
			dateFin_span.id = id+"_dateFin";
			
			var div_button = document.createElement("div");
			//div_button.style.float = "left";
			div_button.style.width = 40 + "%";		
			div_button.style.marginLeft = 62 + "%";
				
			var button_modifier = document.createElement("button");
			button_modifier.style.float = "left";
			button_modifier.style.width = 47 + "%";
			button_modifier.innerHTML = "Modifier";
				
			var button_annuler = document.createElement("button");
			button_annuler.style.width = 47 + "%";
			button_annuler.style.marginLeft = 50 + "%";
			button_annuler.innerHTML = "Annuler";
			
			if(a.etat == 0){ //action prog	
				button_modifier.onclick = function(){
					let new_div = document.createElement("div");
					new_div.style.opacity = "60%";
					new_div.style.background = "white";
					new_div.id = "current_modif";
					
					let span_action = document.createElement("span");
					span_action.innerHTML = a.name + " :" ;
					
					new_div.appendChild(span_action);
					new_div.appendChild(affichageAction(null, a));
				
					if(document.getElementById("current_modif"))
						document.getElementById("myTasks").removeChild(document.getElementById("current_modif"));
					document.getElementById("myTasks").appendChild(new_div);
				}		
				
				button_annuler.innerHTML = "Supprimer";
				button_annuler.onclick = function(){
					if(confirm("Etes-vous sur de vouloir supprimer cette tache : " + a.name)){
						var index = home.actions.indexOf(a);
						home.actions.splice(index, 1);
						actionProg.removeChild(document.getElementById(id));
					}
				}
				dateFin_span.innerHTML = "Commence le " + dateD.toLocaleDateString("fr-FR", options);
			
				new_action_cours.appendChild(name_span);
				div_button.appendChild(button_modifier);
				div_button.appendChild(button_annuler);
				new_action_cours.appendChild(div_button);
				new_action_cours.appendChild(dateFin_span);
				actionProg.appendChild(new_action_cours);
			}else if(a.etat == 1){ //action en cours
				button_modifier.disabled = true;
				
				button_annuler.onclick = function(){
					if(confirm("Etes-vous sur de vouloir annuler cette tache : " + a.name)){
						a.etat = -1;
						actionEnCours.removeChild(document.getElementById(id));
					}
				}
				
				var progress_action = new_progess(id);

				dateFin_span.innerHTML = "Termine le " + dateF.toLocaleDateString("fr-FR", options);
				
				new_action_cours.appendChild(name_span);
				new_action_cours.appendChild(progress_action);
				div_button.appendChild(button_modifier);
				div_button.appendChild(button_annuler);
				new_action_cours.appendChild(div_button);
				new_action_cours.appendChild(dateFin_span);
				actionEnCours.appendChild(new_action_cours);
			}else {
				button_annuler.innerHTML = "Supprimer";
				button_annuler.onclick = function(){
					if(confirm("Etes-vous sur de vouloir supprimer cette tache : " + a.name)){
						var index = home.actions.indexOf(a);
						home.actions.splice(index, 1);
						actionFini.removeChild(document.getElementById(id));
					}
				}
				var dateFin_span = document.createElement("span");

				dateFin_span.innerHTML = "Tache fini le " + dateF.toLocaleDateString("fr-FR", options);
				
				var status_span = document.createElement("span");
				status_span.innerHTML = "Status : ";
				if(a.etat == 2) status_span.innerHTML += "Terminée";
				else if (a.etat == -1) status_span.innerHTML += "Annulée";
				status_span.style.marginLeft = 80 + "%";
				status_span.style.width = 20 + "%";
				status_span.id = id+"_dateFin";
			
				new_action_cours.appendChild(name_span);
				new_action_cours.appendChild(dateFin_span);
				div_button.appendChild(button_annuler);
				new_action_cours.appendChild(div_button);
				new_action_cours.appendChild(status_span);
				actionFini.appendChild(new_action_cours);
			}
		}else{
			if(a.etat == 1){
				let progressbar = document.getElementById(id+"_myBar");
				let pourcent = calculeProgress(dateD, dateF).toFixed(0);
				progressbar.style.width = pourcent + "%";
				progressbar.innerHTML = pourcent + "%";
			}
		}
	});
}


//Calcule la difference entre deux dates
function diffdate(d1,d2,u){
	div=1;
	switch(u){
	case 's': div=1000;
				 break;
	case 'm': div=1000*60
				 break;
	case 'h': div=1000*60*60
				 break;
	case 'd': div=1000*60*60*24
				 break;
}
 
var Diff = d2.getTime() - d1.getTime();
	return Math.ceil((Diff/div))
}

//Calcule le pourcentage de fin
var calculeProgress = function(db, df){
	return (diffdate(db,new Date(),'s')/diffdate(db,df,'s'))*100;
}
//Fonction de creation de progressBar
var new_progess = function(name){
	var myProgress = document.createElement("div");
	myProgress.id = name + "_myProgress";
	myProgress.style.width = 35 + "%";
	myProgress.style.color = "grey";
	myProgress.style.marginLeft = 25 + "%";
	myProgress.style.border = "1px solid black";
	var myBar = document.createElement("div");
	myBar.id = name + "_myBar";
	myBar.style.width = 0 + "px";
	myBar.style.height = 30 + "px";
    myBar.style.background = "green";
	myBar.innerHTML = 0 + "%";
	myProgress.appendChild(myBar);
	return myProgress;
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
	  if(document.getElementById("detail_piece"))
      document.getElementById("myHome").removeChild(document.getElementById("detail_piece"));
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
	miniplan_div.style.margin = "0 auto";
	miniplan_div.load = function(){
	  home.etages[home.selectEtage].miniDisplay(miniplan_div, doc.name);
	}
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

		alert("La lumiere de " + doc.name + " est bien " + buttonlight_p.innerHTML + "!");
		if(doc.light)
			buttonlight_p.innerHTML = "Eteindre";
		else
			buttonlight_p.innerHTML = "Allumer";
		//MAJ du plan
		home.etages[home.selectEtage].majAffichage();
		home.etages[home.selectEtage].miniDisplay();
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
	labeltempAff_p.id = "slider_temp";
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
		alert("Les volets " + doc.name + " sont bien " + buttonvolet_p.innerHTML + "!");
				if(doc.volet)
			buttonvolet_p.innerHTML = "Fermer";
		else
			buttonvolet_p.innerHTML = "Ouvrir";
		//MAJ du plan
		home.etages[home.selectEtage].majAffichage();
		home.etages[home.selectEtage].miniDisplay();
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
	miniplan_div.load();
}

//Change tous les volets de la maison
var changeAllVolet = function(b){
  home.etages.forEach(function(etage){
    etage.pieces.forEach(function(piece){
      piece.volet = b;
    })
  });
  if(b)
    alert("Tous les volets de la maison sont maintenant ouvert");
  else
    alert("Tous les volets de la maison sont maintenant fermé");
  home.etages[home.selectEtage].majAffichage();
  home.etages[home.selectEtage].miniDisplay();
}

//chnage toutes les lumieres de la maison
var changeAllLight = function(b){
  home.etages.forEach(function(etage){
    etage.pieces.forEach(function(piece){
      piece.light = b;
    })
  });
  if(b)
    alert("Toutes les lumieres de la maison sont maintenant allumé");
  else
    alert("Toutes les lumieres de la maison sont maintenant éteintes");
      
  home.etages[home.selectEtage].majAffichage();
  home.etages[home.selectEtage].miniDisplay();
}

//change la temperature de la maison
var changeAllTemp = function(temp){
    home.etages.forEach(function(etage){
    etage.pieces.forEach(function(piece){
      piece.temp = temp;
    })
  });
  document.getElementById("temp_maison").innerHTML = temp + "°c";
  document.getElementById("slider_temp").innerHTML = temp + "°c";
  
  home.etages[home.selectEtage].majAffichage();
  home.etages[home.selectEtage].miniDisplay();
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

var cuisson = new Action(cuisine, "Cuisson", "degree", "°C");
var alarme = new Action(chambre, "Alarme");

var datetest = new Date();
datetest.setMinutes(datetest.getMinutes());

var datetest2 = new Date();
datetest2.setMinutes(datetest.getMinutes()+1);
/*lancementAction(chambre, alarme, datetest, 1);
lancementAction(chambre, alarme, datetest2, 10);*/

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

//permet de mettre a jour les taches toutes les secondes
setInterval(generateListTasks, 1000);