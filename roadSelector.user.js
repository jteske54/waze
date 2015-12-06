// ==UserScript==
// @name				WME Road Selector
// @description 		Makes selection of multiple roads based on given condition
// @include 			https://www.waze.com/editor/*
// @include 			https://www.waze.com/*/editor/*
// @include 			https://editor-beta.waze.com/*
// @version 			1.10
// @grant				none
// @copyright			2015, pvo11
// @namespace			https://greasyfork.org/scripts/3462-wme-road-selector
// ==/UserScript==

roadSelector_version = GM_info.script.version;


var StringOps = {
	0: "=",
	1: "!=",
	2: "contains",
	3: "! contains",
	4: "~"
};

function populateStringOps(sel)
{
	var selectStringOp = getId(sel);

	for (var id in StringOps) {
		var txt = StringOps[id];
		var usrOption = document.createElement('option');
		var usrText = document.createTextNode(txt);
		if (id === 0) {
			usrOption.setAttribute('selected',true);
		}
		usrOption.setAttribute('value',id);
		usrOption.appendChild(usrText);
		selectStringOp.appendChild(usrOption);
	}
}


var IntegerOps = {
	0: "=",
	1: "!=",
	2: ">",
	3: ">=",
	4: "<",
	5: "<="
};

function populateIntegerOps(sel)
{
	var selectIntegerOp = getId(sel);

	for (var id in IntegerOps) {
		var txt = IntegerOps[id];
		var usrOption = document.createElement('option');
		var usrText = document.createTextNode(txt);
		if (id === 0) {
			usrOption.setAttribute('selected',true);
		}
		usrOption.setAttribute('value',id);
		usrOption.appendChild(usrText);
		selectIntegerOp.appendChild(usrOption);
	}
}


var EqualOps = {
	0: "=",
	1: "!="
};

function populateEqualOps(sel)
{
	var selectEqualOp = getId(sel);

	for (var id in EqualOps) {
		var txt = EqualOps[id];
		var usrOption = document.createElement('option');
		var usrText = document.createTextNode(txt);
		if (id === 0) {
			usrOption.setAttribute('selected',true);
		}
		usrOption.setAttribute('value',id);
		usrOption.appendChild(usrText);
		selectEqualOp.appendChild(usrOption);
	}
}


var DirOps = {
	0: "none",
	1: "any",
	2: "both",
	3: "A->B",
	4: "B->A",
	5: "hidden",
	6: "unverified"
};

function populateDirOps(sel)
{
	var selectDirOp = getId(sel);
	for (var id in DirOps) {
		var txt = DirOps[id];
		var usrOption = document.createElement('option');
		var usrText = document.createTextNode(txt);
		if (id === 0) {
			usrOption.setAttribute('selected',true);
		}
		usrOption.setAttribute('value',id);
		usrOption.appendChild(usrText);
		selectDirOp.appendChild(usrOption);
	}
}


var Countries = new Object();

function populateCountries(sel)
{
	var selectCountry = getId(sel);
	Countries = new Object();

	for (var countryID in  Waze.model.countries.objects) {
		Countries[countryID] = Waze.model.countries.get(countryID).name;
	}


	for (var id in Countries) {
		var txt = Countries[id];
		var usrOption = document.createElement('option');
		var usrText = document.createTextNode(txt);
		usrOption.setAttribute('value',id);
		usrOption.appendChild(usrText);
		selectCountry.appendChild(usrOption);
	}
}


var RoadTypes = {
	101: "--- Highways ---",
	3: "Freeway",
	6: "Major Highway",
	7: "Minor Highway",
	4: "Ramp",
	102: "--- Streets ---",
	2: "Primary Street",
	1: "Street",
	103: "--- Other drivable ---",
	8: "Dirt road / 4x4",
	20: "Parking Lot",
	17: "Private Road",
	104: "--- Non-drivable ---",
	5: "Walking Trail",
	10: "Pedestrian Bw.",
	16: "Stairway",
	18: "Railroad",
	19: "Runway/Taxiway",
	15: "Ferry"
};
var RoadTypesOrder = [101, 3, 6, 7, 4, 102, 2, 1, 103, 8, 20, 17, 104, 5, 10, 16, 18, 19, 14];

function populateRoadTypes(sel)
{
	var selectRoadType = getId(sel);

	for (i = 0; i < RoadTypesOrder.length; i++) {
		var id = RoadTypesOrder[i];
		var txt = RoadTypes[id];
		var usrOption = document.createElement('option');
		var usrText = document.createTextNode(txt);
		if (id == 1) {
			usrOption.setAttribute('selected',true);
		}
		if (id > 100) {
			usrOption.setAttribute('disabled',true);
			usrOption.setAttribute('style','font-weight: bold');
		}
		usrOption.setAttribute('value',id);
		usrOption.appendChild(usrText);
		selectRoadType.appendChild(usrOption);
	}
}


var Directions = {
	0: "Two way (=)",
	1: "One way (A->B)",
	2: "One way (B->A)",
	3: "Unknown"
};

function populateDirections(sel)
{
	var selectDirection = getId(sel);

	for (var id in Directions) {
		var txt = Directions[id];
		var usrOption = document.createElement('option');
		var usrText = document.createTextNode(txt);
		if (id === 0) {
			usrOption.setAttribute('selected',true);
		}
		usrOption.setAttribute('value',id);
		usrOption.appendChild(usrText);
		selectDirection.appendChild(usrOption);
	}
}


function populateElevations(sel)
{
	var selectElevation = getId(sel);

	for (var id = 9; id >= -5; id--) {
		var txt;
		if (id === 0) {
			txt = "Ground";
		} else {
			txt = String(id);
		}
		var usrOption = document.createElement('option');
		var usrText = document.createTextNode(txt);
		if (id === 0) {
			usrOption.setAttribute('selected',true);
		}
		usrOption.setAttribute('value',id);
		usrOption.appendChild(usrText);
		selectElevation.appendChild(usrOption);
	}
}


function populateLocks(sel)
{
	var selectLock = getId(sel);

	for (var id = 1; id <= 6; id++) { 
		var txt = String(id);
		var usrOption = document.createElement('option');
		var usrText = document.createTextNode(txt);
		if (id === 1) {
			usrOption.setAttribute('selected',true);
		}
		usrOption.setAttribute('value',id);
		usrOption.appendChild(usrText);
		selectLock.appendChild(usrOption);
	}
}


var milesConst = 1.609344;

function km2miles(km) {
  return Math.round(km / milesConst);
}


function miles2km(m) {
  return Math.round(m * milesConst);
}


var ExprStatus = 0;
var ExprTree = new Object();
var BktTrees = new Object();
var BktCount = 0;
var hasStates;
var speedInMiles;


function checkExpr(tree, segment)
{

		if (typeof (tree.type) === 'undefined') {
		return false;
	}

	var result;
	switch (tree.type) {
		case "Country":
			var sid = segment.attributes.primaryStreetID;
			if (typeof(sid) === 'undefined' ||  sid === null) {
				result = false;
			} else {
				var street = Waze.model.streets.get(sid);
				var countryID = Waze.model.cities.get(street.cityID).countryID;

				if (tree.op === "0") {
					result = tree.id == countryID;
				} else {
					result = tree.id != countryID;
				}
			}
			break;
		case "State":
			var sid = segment.attributes.primaryStreetID;
			if (typeof(sid) === 'undefined' ||  sid === null) {
				result = false;
			} else {
				var street = Waze.model.streets.get(sid);
				var stateID = Waze.model.cities.get(street.cityID).stateID;
				var stateName = Waze.model.states.get(stateID).name;
				if (stateName === null) {
					stateName = "";
				}
				var condTxt = tree.txt;
				if ((!getId("cbRSCaseSens").checked) && (tree.op != "4")) {
					condTxt = condTxt.toLowerCase();
					stateName = stateName.toLowerCase();
				}
				switch (tree.op) {
					case "0":
						result = stateName == condTxt;
						break;
					case "1":
						result = stateName != condTxt;
						break;
					case "2":
						result = stateName.indexOf(condTxt) >= 0;
						break;
					case "3":
						result = stateName.indexOf(condTxt) < 0;
						break;
					default:
						var re;
						if (getId("cbRSCaseSens").checked) {
							re = new RegExp(condTxt);
					    } else {
							re = new RegExp(condTxt, "i");
					    }
						result = stateName.search(re) >= 0;
						break;
				}
			}
			break;
		case "City":
			var sid = segment.attributes.primaryStreetID;
			if (typeof(sid) === 'undefined' ||  sid === null) {
				result = false;
			} else {
				var street = Waze.model.streets.get(sid);
				var cityName = Waze.model.cities.get(street.cityID).name;
				if (cityName === null) {
					cityName = "";
				}
				var condTxt = tree.txt;
				if ((!getId("cbRSCaseSens").checked) && (tree.op != "4")) {
					condTxt = condTxt.toLowerCase();
					cityName = cityName.toLowerCase();
				}
				switch (tree.op) {
					case "0":
						result = cityName == condTxt;
						break;
					case "1":
						result = cityName != condTxt;
						break;
					case "2":
						result = cityName.indexOf(condTxt) >= 0;
						break;
					case "3":
						result = cityName.indexOf(condTxt) < 0;
						break;
					default:
						var re;
						if (getId("cbRSCaseSens").checked) {
							re = new RegExp(condTxt);
					    } else {
							re = new RegExp(condTxt, "i");
					    }
						result = cityName.search(re) >= 0;
						break;
				}
			}
			break;
		case "ACity":
			result = false;
			for(i = 0; i < segment.attributes.streetIDs.length; i++){
				var sid = segment.attributes.streetIDs[i];
				if (sid !== null) {
					var street = Waze.model.streets.get(sid);
					var cityName = Waze.model.cities.get(street.cityID).name;
					if (cityName === null) {
						cityName = "";
					}
					var condTxt = tree.txt;
					if ((!getId("cbRSCaseSens").checked) && (tree.op != "4")) {
						condTxt = condTxt.toLowerCase();
						cityName = cityName.toLowerCase();
					}
					switch (tree.op) {
						case "0":
							result = result || (cityName == condTxt);
							break;
						case "1":
							result = result || (cityName != condTxt);
							break;
						case "2":
							result = result || (cityName.indexOf(condTxt) >= 0);
							break;
						case "3":
							result = result || (cityName.indexOf(condTxt) < 0);
							break;
						default:
							var re;
							if (getId("cbRSCaseSens").checked) {
								re = new RegExp(condTxt);
						    } else {
								re = new RegExp(condTxt, "i");
						    }
							result = result || (cityName.search(re) >= 0);
							break;
					}
				}
			}
			break;
		case "Street":
			var sid = segment.attributes.primaryStreetID;
			if (typeof(sid) === 'undefined' ||  sid === null) {
				result = false;
			} else {
				var street = Waze.model.streets.get(sid);
				var streetName = street.name;
				if (streetName === null) {
					streetName = "";
				}
				var condTxt = tree.txt;
				if ((!getId("cbRSCaseSens").checked) && (tree.op != "4")) {
					condTxt = condTxt.toLowerCase();
					streetName = streetName.toLowerCase();
				}
				switch (tree.op) {
					case "0":
						result = streetName == condTxt;
						break;
					case "1":
						result = streetName != condTxt;
						break;
					case "2":
						result = streetName.indexOf(condTxt) >= 0;
						break;
					case "3":
						result = streetName.indexOf(condTxt) < 0;
						break;
					default:
						var re;
						if (getId("cbRSCaseSens").checked) {
							re = new RegExp(condTxt);
					    } else {
							re = new RegExp(condTxt, "i");
					    }
						result = streetName.search(re) >= 0;
						break;
				}
			}
			break;
		case "AStreet":
			result = false;
			for(i = 0; i < segment.attributes.streetIDs.length; i++){
				var sid = segment.attributes.streetIDs[i];
				if (sid !== null) {
					var street = Waze.model.streets.get(sid);
					var streetName = street.name;
					if (streetName === null) {
						streetName = "";
					}
					var condTxt = tree.txt;
					if ((!getId("cbRSCaseSens").checked) && (tree.op != "4")) {
						condTxt = condTxt.toLowerCase();
						streetName = streetName.toLowerCase();
					}
					switch (tree.op) {
						case "0":
							result = result || (streetName == condTxt);
							break;
						case "1":
							result = result || (streetName != condTxt);
							break;
						case "2":
							result = result || (streetName.indexOf(condTxt) >= 0);
							break;
						case "3":
							result = result || (streetName.indexOf(condTxt) < 0);
							break;
						default:
							var re;
							if (getId("cbRSCaseSens").checked) {
								re = new RegExp(condTxt);
						    } else {
								re = new RegExp(condTxt, "i");
						    }
							result = result || (streetName.search(re) >= 0);
							break;
					}
				}
			}
			break;
		case "NoName":
			if (tree.op) {
				result = typeof(segment.attributes.primaryStreetID) === 'undefined' || segment.attributes.primaryStreetID === null;
			} else {
				result = typeof(segment.attributes.primaryStreetID) !== 'undefined' && segment.attributes.primaryStreetID !== null;
			}
			break;
		case "ANoName":
			if (tree.op) {
				result = segment.attributes.streetIDs.length === 0;
			} else {
				result = segment.attributes.streetIDs.length > 0;
			}
			break;
		case "RoadType":
			if (tree.op === "0") {
				result = tree.id == segment.attributes.roadType;
			} else {
				result = tree.id != segment.attributes.roadType;
			}
			break;
		case "IsRound":
			if (tree.op) {
				result = segment.attributes.junctionID !== null;
			} else {
				result = segment.attributes.junctionID === null;
			}
			break;
		case "IsToll":
			if (tree.op) {
				result = segment.isTollRoad();
			} else {
				result = !segment.isTollRoad();
			}
			break;
		case "Direction":
			var dir = 0;
			if (!segment.attributes.fwdDirection) {
				dir += 2;
			}
			if (!segment.attributes.revDirection) {
				dir += 1;
			}
			if (tree.op === "0") {
				result = tree.id == dir;
			} else {
				result = tree.id != dir;
			}
			break;
		case "Elevation":
			switch (tree.op) {
				case "0":
					result = parseInt(tree.id, 10) === segment.attributes.level;
					break;
				case "1":
					result = parseInt(tree.id, 10) !== segment.attributes.level;
					break;
				case "2":
					result = parseInt(tree.id, 10) < segment.attributes.level;
					break;
				case "3":
					result = parseInt(tree.id, 10) <= segment.attributes.level;
					break;
				case "4":
					result = parseInt(tree.id, 10) > segment.attributes.level;
					break;
				default:
					result = parseInt(tree.id, 10) >= segment.attributes.level;
					break;
			}
			break;
		case "Tunnel":
			if (tree.op) {
				result = segment.isTunnel();
			} else {
				result = !segment.isTunnel();
			}
			break;
		case "ManLock":
			if	(segment.attributes.lockRank === null) {
				result = false;
			} else {
				switch (tree.op) {
					case "0":
						result = parseInt(tree.id, 10) === segment.attributes.lockRank + 1;
						break;
					case "1":
						result = parseInt(tree.id, 10) !== segment.attributes.lockRank + 1;
						break;
					case "2":
						result = parseInt(tree.id, 10) < segment.attributes.lockRank + 1;
						break;
					case "3":
						result = parseInt(tree.id, 10) <= segment.attributes.lockRank + 1;
						break;
					case "4":
						result = parseInt(tree.id, 10) > segment.attributes.lockRank + 1;
						break;
					default:
						result = parseInt(tree.id, 10) >= segment.attributes.lockRank + 1;
						break;
				}
			}
			break;
		case "TrLock":
			if	(segment.attributes.lockRank === null) {
				switch (tree.op) {
					case "0":
						result = parseInt(tree.id, 10) === segment.attributes.rank + 1;
						break;
					case "1":
						result = parseInt(tree.id, 10) !== segment.attributes.rank + 1;
						break;
					case "2":
						result = parseInt(tree.id, 10) < segment.attributes.rank + 1;
						break;
					case "3":
						result = parseInt(tree.id, 10) <= segment.attributes.rank + 1;
						break;
					case "4":
						result = parseInt(tree.id, 10) > segment.attributes.rank + 1;
						break;
					default:
						result = parseInt(tree.id, 10) >= segment.attributes.rank + 1;
						break;
				}
			} else {
				result = false;
			}
			break;
		case "Speed":
			switch (tree.op) {
				case "0":
					if (tree.txt === '') {
						result = (typeof(segment.attributes.fwdMaxSpeed) === 'undefined' || segment.attributes.fwdMaxSpeed === null) &&
							(typeof(segment.attributes.revMaxSpeed) === 'undefined' || segment.attributes.revMaxSpeed === null);
					} else {
						result = segment.attributes.fwdMaxSpeed !== tree.txt && segment.attributes.revMaxSpeed !== tree.txt;
					}
					break;
				case "1":
					if (tree.txt === '') {
						result = (typeof(segment.attributes.fwdMaxSpeed) !== 'undefined' && segment.attributes.fwdMaxSpeed !== null) ||
							(typeof(segment.attributes.revMaxSpeed) !== 'undefined' && segment.attributes.revMaxSpeed !== null);
					} else {
						result = segment.attributes.fwdMaxSpeed === tree.txt || segment.attributes.revMaxSpeed === tree.txt;
					}
					break;
				case "2":
					if (tree.txt === '') {
						result = (typeof(segment.attributes.fwdMaxSpeed) !== 'undefined' && segment.attributes.fwdMaxSpeed !== null) &&
							(typeof(segment.attributes.revMaxSpeed) !== 'undefined' && segment.attributes.revMaxSpeed !== null);
					} else {
						result = segment.attributes.fwdMaxSpeed === tree.txt && segment.attributes.revMaxSpeed === tree.txt;
					}
					break;
				case "3":
					if (tree.txt === '') {
						result = typeof(segment.attributes.fwdMaxSpeed) !== 'undefined' && segment.attributes.fwdMaxSpeed !== null;
					} else {
						result = segment.attributes.fwdMaxSpeed === tree.txt;
					}
					break;
				case "4":
					if (tree.txt === '') {
						result = typeof(segment.attributes.revMaxSpeed) !== 'undefined' && segment.attributes.revMaxSpeed !== null;
					} else {
						result = segment.attributes.revMaxSpeed === tree.txt;
					}
					break;
				case "5":
					if (tree.txt === '') {
						result = (!segment.attributes.fwdDirection && typeof(segment.attributes.fwdMaxSpeed) !== 'undefined' && segment.attributes.fwdMaxSpeed !== null) ||
							(!segment.attributes.revDirection && typeof(segment.attributes.revMaxSpeed) !== 'undefined' && segment.attributes.revMaxSpeed !== null);
					} else {
						result = (!segment.attributes.fwdDirection && segment.attributes.fwdMaxSpeed === tree.txt) ||
							 (!segment.attributes.revDirection && segment.attributes.revMaxSpeed === tree.txt);
					}
					break;
				default:
					if (tree.txt === '') {
						result = (segment.attributes.fwdMaxSpeedUnverified && typeof(segment.attributes.fwdMaxSpeed) !== 'undefined' && segment.attributes.fwdMaxSpeed !== null) ||
							(segment.attributes.revMaxSpeedUnverified && typeof(segment.attributes.revMaxSpeed) !== 'undefined' && segment.attributes.revMaxSpeed !== null);
					} else {
						result = (segment.attributes.fwdMaxSpeedUnverified && segment.attributes.fwdMaxSpeed === tree.txt) ||
							 (segment.attributes.revMaxSpeedUnverified && segment.attributes.revMaxSpeed === tree.txt);
					}
					break;
			}
			break;
		case "IsNew":
			if (tree.op) {
				result = segment.isNew();
			} else {
				result = !segment.isNew();
			}
			break;
		case "IsChngd":
			if (tree.op) {
				result = !segment.isUnchanged();
			} else {
				result = segment.isUnchanged();
			}
			break;
		case "OnScr":
			var e = Waze.map.getExtent();
			var eg = e.toGeometry();
			var os = eg.intersects(segment.geometry);
			if (tree.op) {
				result = os;
			} else {
				result = !os;
			}
			break;
		case "Restr":
			if (tree.op) {
				result = segment.getRestrictionCount() !== 0;
			} else {
				result = segment.getRestrictionCount() === 0;
			}
			break;
		case "Clsr":
			if (typeof(tree.op) === "boolean") {
				if (tree.op) {
					result = segment.hasClosures();
				} else {
					result = !segment.hasClosures();
				}
			} else {
				if (segment.hasClosures()) {
					result = false;
					for (closure in Waze.model.roadClosures.objects) {
						if (Waze.model.roadClosures.objects[closure].segID === segment.attributes.id) {
							var cmpDateTxt;
							if (tree.op >= 6) {
								cmpDateTxt = Waze.model.roadClosures.objects[closure].endDate;
							} else {
								cmpDateTxt = Waze.model.roadClosures.objects[closure].startDate;
							}
							var cmpDateArr = cmpDateTxt.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/);
							var cmpDate = new Date(parseInt(cmpDateArr[1], 10), parseInt(cmpDateArr[2], 10) - 1, parseInt(cmpDateArr[3], 10), parseInt(cmpDateArr[4], 10), parseInt(cmpDateArr[5], 10), 0, 0);
							var cmpDays = Math.floor((cmpDate.getTime() - new Date().getTime()) / 86400000);
							switch (tree.op) {
								case 0:
								case 6:
									result = parseInt(tree.txt, 10) > cmpDays;
									break;
								case 1:
								case 7:
									result = parseInt(tree.txt, 10) <= cmpDays;
									break;
								case 2:
								case 8:
									result = parseInt(tree.txt, 10) < cmpDays;
									break;
								case 3:
								case 9:
									result = parseInt(tree.txt, 10) >= cmpDays;
									break;
								case 4:
								case 10:
									result = parseInt(tree.txt, 10) === cmpDays;
									break;
								case 5:
								case 11:
									result = parseInt(tree.txt, 10) !== cmpDays;
									break;
								default:
									result = false;
									break;
							}
						}
					}
				} else {
					result = false;
				}
			}
			break;
		case "Updtd":
			var name;
			if (typeof(segment.attributes.updatedBy) === 'undefined' ||  sid === null) {
				name = '';
			} else {
				name = Waze.model.users.get(segment.attributes.updatedBy).userName;
				if ((typeof(name) === "undefined") || (name === null)) {
					return false;
				}
			}
			var condTxt = tree.txt;
			if ((!getId("cbRSCaseSens").checked) && (tree.op != "4")) {
				condTxt = condTxt.toLowerCase();
				name = name.toLowerCase();
			}
			switch (tree.op) {
				case "0":
					result = name == condTxt;
					break;
				case "1":
					result = name != condTxt;
					break;
				case "2":
					result = name.indexOf(condTxt) >= 0;
					break;
				case "3":
					result = name.indexOf(condTxt) < 0;
					break;
				default:
					var re;
					if (getId("cbRSCaseSens").checked) {
						re = new RegExp(condTxt);
				    } else {
						re = new RegExp(condTxt, "i");
				    }
					result = name.search(re) >= 0;
					break;
			}
			break;
		case "Crtd":
			var name;
			if (typeof(segment.attributes.createdBy) === 'undefined' ||  sid === null) {
				name = '';
			} else {
				name = Waze.model.users.get(segment.attributes.createdBy).userName;
				if ((typeof(name) === "undefined") || (name === null)) {
					return false;
				}
			}
			var condTxt = tree.txt;
			if ((!getId("cbRSCaseSens").checked) && (tree.op != "4")) {
				condTxt = condTxt.toLowerCase();
				name = name.toLowerCase();
			}
			switch (tree.op) {
				case "0":
					result = name == condTxt;
					break;
				case "1":
					result = name != condTxt;
					break;
				case "2":
					result = name.indexOf(condTxt) >= 0;
					break;
				case "3":
					result = name.indexOf(condTxt) < 0;
					break;
				default:
					var re;
					if (getId("cbRSCaseSens").checked) {
						re = new RegExp(condTxt);
				    } else {
						re = new RegExp(condTxt, "i");
				    }
					result = name.search(re) >= 0;
					break;
			}
			break;
		case "LastU":
			var updatedDays;
			if (typeof(segment.attributes.updatedOn) === 'undefined' ||  sid === null) {
				updatedDays = 0;
			} else {
				updatedDays =  Math.floor((new Date().getTime() - segment.attributes.updatedOn) / 86400000);
			}
			switch (tree.op) {
				case "0":
					result = parseInt(tree.txt, 10) === updatedDays;
					break;
				case "1":
					result = parseInt(tree.txt, 10) !== updatedDays;
					break;
				case "2":
					result = parseInt(tree.txt, 10) < updatedDays;
					break;
				case "3":
					result = parseInt(tree.txt, 10) <= updatedDays;
					break;
				case "4":
					result = parseInt(tree.txt, 10) > updatedDays;
					break;
				default:
					result = parseInt(tree.txt, 10) >= updatedDays;
					break;
			}
			break;
		case "SegId":
			var ids = tree.txt.replace(/[^\d]/g,',');
			var idsArr = ids.split(',');
			switch (tree.op) {
				case "0":
					result = false;
					break;
				default:
					result = true;
					break;
			}
			for(i = 0; i < idsArr.length; i++){
				if (idsArr[i] !== '') { 
					switch (tree.op) {
						case "0":
							result = result || idsArr[i] == segment.attributes.id;
							break;
						default:
							result = result && idsArr[i] != segment.attributes.id;
							break;
					}
				}
			}
			break;
		case "And":
			if (checkExpr (tree.L, segment)) {
				result = checkExpr (tree.R, segment);
			} else {
				result = false;
			}
			break;
		case "Or":
			if (checkExpr (tree.L, segment)) {
				result = true;
			} else {
				result = checkExpr (tree.R, segment);
			}
			break;
		case "Not":
			result = !checkExpr (tree.R, segment);
			break;
		case "Bkt":
			result = checkExpr (tree.L, segment);
			break;
		default:
			result = false;
			break;
	}
	return result;
}


function genExptrTxt(tree)
{
	if (typeof (tree.type) === 'undefined') {
		return "";
	}

	var result;
	switch (tree.type) {
		case "Country":
			result = 'Country ' +  EqualOps[tree.op] + ' "' + Countries[tree.id] + '"';
			break;
		case "State":
		case "City":
		case "Street":
			result = tree.type + ' ';
			switch (tree.op) {
				case "0":
				case "1":
					result += StringOps[tree.op] + ' "' + tree.txt + '"';
					break;
				default:
					result += StringOps[tree.op] + ' ("' + tree.txt + '")';
					break;
			}
			break;
		case "ACity":
			result = 'Alt. City ';
			switch (tree.op) {
				case "0":
				case "1":
					result += StringOps[tree.op] + ' "' + tree.txt + '"';
					break;
				default:
					result += StringOps[tree.op] + ' ("' + tree.txt + '")';
					break;
			}
			break;
		case "AStreet":
			result = 'Alt. Street ';
			switch (tree.op) {
				case "0":
				case "1":
					result += StringOps[tree.op] + ' "' + tree.txt + '"';
					break;
				default:
					result += StringOps[tree.op] + ' ("' + tree.txt + '")';
					break;
			}
			break;
		case "NoName":
			if (tree.op) {
				result = 'Unnamed';
			} else {
				result = 'Has name';
			}
			break;
		case "ANoName":
			if (tree.op) {
				result = 'NO Alt. names';
			} else {
				result = 'Has Alt. name(s)';
			}
			break;
		case "RoadType":
			result = 'Road Type ' + EqualOps[tree.op] + ' "' + RoadTypes[tree.id] + '"';
			break;
		case "IsToll":
			if (tree.op) {
				result = 'Is Toll Road';
			} else {
				result = 'Is NOT Toll Road';
			}
			break;
		case "IsRound":
			if (tree.op) {
				result = 'Is Roundabout';
			} else {
				result = 'Is NOT Roundabout';
			}
			break;
		case "Direction":
			result = 'Direction ' +  EqualOps[tree.op] + ' "' + Directions[tree.id] + '"';
			break;
		case "Elevation":
			if (tree.id == 0) {
				result = 'Elevation ' + IntegerOps[tree.op] + ' "Ground"';
			} else {
				result = 'Elevation ' + IntegerOps[tree.op] + ' ' + tree.id;
			}
			break;
		case "Tunnel":
			if (tree.op) {
				result = 'Is Tunnel';
			} else {
				result = 'Is NOT Tunnel';
			}
			break;
		case "ManLock":
			result = 'Manual Locks ' + IntegerOps[tree.op] + ' ' + tree.id;
			break;
		case "TrLock":
			result = 'Trafic Locks ' + IntegerOps[tree.op] + ' ' + tree.id;
			break;
		case "Speed":
			if (typeof(tree.op) === "boolean") {
				if (tree.op) {
					tree.op = '1';
					tree.txt = '';
				} else {
					tree.op = '0';
					tree.txt = '';
				}
			}
			if (tree.op === '0') {
				result = 'Has NOT speed limit';
			} else if (tree.op !== '6') {
				result = 'Has speed limit';
			} else {
				result = 'Has unverified speed limit';
			}
			if (tree.txt !== '') {
				if (speedInMiles) {
					result += ' ' + km2miles(parseInt(tree.txt, 10)) + ' mph';
				} else {
					result += ' ' + tree.txt + ' km/h';
				}
			}
			if (tree.op !== '6') {
				if (tree.op === '0') {
					if (tree.txt !== '') {
						result += ' in any direction';
					}
				} else {
					result += ' in ' + DirOps[tree.op] + ' direction';
					
					if (tree.op === '2') {
						result += 's';
					}
				}
			}
			break;
		case "IsNew":
			if (tree.op) {
				result = 'Is New';
			} else {
				result = 'Is NOT New';
			}
			break;
		case "IsChngd":
			if (tree.op) {
				result = 'Is Changed';
			} else {
				result = 'Is NOT Changed';
			}
			break;
		case "OnScr":
			if (tree.op) {
				result = 'On Screen';
			} else {
				result = 'OUT of Screen';
			}
			break;
		case "Restr":
			if (tree.op) {
				result = 'Has restriction';
			} else {
				result = 'Has NO restriction';
			}
			break;
		case "Clsr":
			if (typeof(tree.op) === "boolean") {
				if (tree.op) {
					result = 'Has closure';
				} else {
					result = 'Has NO closure';
				}
			} else {
				switch (tree.op) {
					case 0:
						result = "Closure starts before";
						break;
					case 1:
						result = "Closure doesn't start before";
						break;
					case 2:
						result = "Closure starts after";
						break;
					case 3:
						result = "Closure doesn't start after";
						break;
					case 4:
						result = "Closure starts in";
						break;
					case 5:
						result = "Closure doesn't start in";
						break;
					case 6:
						result = "Closure ends before";
						break;
					case 7:
						result = "Closure doesn't end before";
						break;
					case 8:
						result = "Closure ends after";
						break;
					case 9:
						result = "Closure doesn't end after";
						break;
					case 10:
						result = "Closure ends in";
						break;
					case 11:
						result = "Closure doesn't end in";
						break;
					default:
						result = "Error";
						break;
				}
				result += ' ' + tree.txt + ' day';
				if (tree.txt !== '1') {
					result += 's';
				}
			}
			break;
		case "Updtd":
			result = 'Updated by ';
			switch (tree.op) {
				case "0":
				case "1":
					result += StringOps[tree.op] + ' "' + tree.txt + '"';
					break;
				default:
					result += StringOps[tree.op] + ' ("' + tree.txt + '")';
					break;
			}
			break;
		case "Crtd":
			result = 'Created by ';
			switch (tree.op) {
				case "0":
				case "1":
					result += StringOps[tree.op] + ' "' + tree.txt + '"';
					break;
				default:
					result += StringOps[tree.op] + ' ("' + tree.txt + '")';
					break;
			}
			break;
		case "LastU":
			result = 'Last update  ' +	IntegerOps[tree.op] + ' ' + tree.txt + ' days ago';
			break;
		case "SegId":
			result = 'ID ' + StringOps[tree.op] + ' "' + tree.txt + '"';
			break;
		case "And":
			result = genExptrTxt(tree.L) + ' AND ';
			if (typeof (tree.R) !== 'undefined') {
				result += genExptrTxt(tree.R);
			}
			break;
		case "Or":
			result = genExptrTxt(tree.L) + ' OR ';
			if (typeof (tree.R) !== 'undefined') {
				result += genExptrTxt(tree.R);
			}
			break;
		case "Not":
			result = '! ';
			if (typeof (tree.R) !== 'undefined') {
				result += genExptrTxt(tree.R);
			}
			break;
		case "Bkt":
			result = '(';
			result += genExptrTxt(tree.L) + ')';
			break;
		default:
			result = "";
			break;
	}
	return result;
}


function displayExpr()
{
	var ExprTxt = "";
	for (var i = 0; i < BktCount; i ++) {
		ExprTxt += genExptrTxt(BktTrees[i]) + "(";
	}
	ExprTxt += genExptrTxt(ExprTree);
	getId("outRSExpr").value = ExprTxt;
}


function displayStatus()
{
	if (ExprStatus === 0 || ExprStatus === 2) {
		getId("btnRSAnd").disabled = true;
		getId("btnRSOr").disabled = true;
		if (ExprStatus === 2) {
			getId("btnRSNot").disabled = true;
		} else {
			getId("btnRSNot").disabled = false;
		}
		getId("btnRSRBkt").disabled = true;
		getId("btnRSSelect").disabled = true;
	} else {
		getId("btnRSAnd").disabled = false;
		getId("btnRSOr").disabled = false;
		getId("btnRSNot").disabled = true;
		if (BktCount === 0) {
			getId("btnRSRBkt").disabled = true;
			getId("btnRSSelect").disabled = false;
		} else {
			getId("btnRSRBkt").disabled = false;
			getId("btnRSSelect").disabled = true;
		}
	}
	
	getId("outRSNumBkt").value = BktCount;
	displayExpr();
}


function addCondition(cond)
{
	if (ExprStatus === 1) {
		makeAnd();
	}
	if (typeof (ExprTree.type) === 'undefined') {
		ExprTree = cond;
	} else {
		if (typeof (ExprTree.R) === 'undefined') {
			ExprTree.R = cond;
		} else {
			ExprTree.R.R = cond;
		}
	}
	ExprStatus = 1;
	displayStatus ();
}

	
function makeCountry(ev)
{
	var cond = new Object();
	cond.type = "Country";
	cond.op = getId("opRSCountry").value;
	cond.id = getId("selRSCountry").value;
	addCondition(cond);
}


function makeState(ev)
{
	var cond = new Object();
	cond.type = "State";
	cond.op = getId("opRSState").value;
	cond.txt = getId("inRSState").value;
	addCondition(cond);
}


function makeCity(ev)
{
	var cond = new Object();
	if (getId("cbRSAlter").checked) {
		cond.type = "ACity";
	} else {
		cond.type = "City";
	}
	cond.op = getId("opRSCity").value;
	cond.txt = getId("inRSCity").value;
	addCondition(cond);
}


function makeStreet(ev)
{
	var cond = new Object();
	if (getId("cbRSAlter").checked) {
		cond.type = "AStreet";
	} else {
		cond.type = "Street";
	}
	cond.op = getId("opRSStreet").value;
	cond.txt = getId("inRSStreet").value;
	addCondition(cond);
}


function makeNoName(ev)
{
	var cond = new Object();
	if (getId("cbRSAlter").checked) {
		cond.type = "ANoName";
	} else {
		cond.type = "NoName";
	}
	cond.op = getId("cbRSNoName").checked;
	addCondition(cond);
}


function makeRoadType(ev)
{
	var cond = new Object();
	cond.type = "RoadType";
	cond.op = getId("opRSRoadType").value;
	cond.id = getId("selRSRoadType").value;
	addCondition(cond);
}


function makeIsRound(ev)
{
	var cond = new Object();
	cond.type = "IsRound";
	cond.op = getId("cbRSIsRound").checked;
	addCondition(cond);
}


function makeIsToll(ev)
{
	var cond = new Object();
	cond.type = "IsToll";
	cond.op = getId("cbRSIsToll").checked;
	addCondition(cond);
}


function makeDirection(ev)
{
	var cond = new Object();
	cond.type = "Direction";
	cond.op = getId("opRSDirection").value;
	cond.id = getId("selRSDirection").value;
	addCondition(cond);
}


function makeElevation(ev)
{
	var cond = new Object();
	cond.type = "Elevation";
	cond.op = getId("opRSElevation").value;
	cond.id = getId("selRSElevation").value;
	addCondition(cond);
}


function makeTunnel(ev)
{
	var cond = new Object();
	cond.type = "Tunnel";
	cond.op = getId("cbRSTunnel").checked;
	addCondition(cond);
}


function makeManLock(ev)
{
	var cond = new Object();
	cond.type = "ManLock";
	cond.op = getId("opRSManLock").value;
	cond.id = getId("selRSManLock").value;
	addCondition(cond);
}


function makeTrLock(ev)
{
	var cond = new Object();
	cond.type = "TrLock";
	cond.op = getId("opRSTrLock").value;
	cond.id = getId("selRSTrLock").value;
	addCondition(cond);
}


function makeSpeed(ev)
{
	var cond = new Object();
	cond.type = "Speed";
	cond.op = getId("opRSSpeed").value;
	var val = getId("inRSSpeed").value;
	if (isNaN(val) || val === '') {
		cond.txt = '';
	} else {
		val = parseInt(val, 10);
		if (speedInMiles) {
			val = miles2km(val);
		}
		cond.txt = val;
	}
	addCondition(cond);
}


function makeIsNew(ev)
{
	var cond = new Object();
	cond.type = "IsNew";
	cond.op = getId("cbRSIsNew").checked;
	addCondition(cond);
}


function makeIsChngd(ev)
{
	var cond = new Object();
	cond.type = "IsChngd";
	cond.op = getId("cbRSIsChngd").checked;
	addCondition(cond);
}


function makeOnScr(ev)
{
	var cond = new Object();
	cond.type = "OnScr";
	cond.op = getId("cbRSOnScr").checked;
	addCondition(cond);
}


function makeRestr(ev)
{
	var cond = new Object();
	cond.type = "Restr";
	cond.op = getId("cbRSRestr").checked;
	addCondition(cond);
}


function makeClsr(ev)
{
	var cond = new Object();
	cond.type = "Clsr";
	if (parseInt(getId("opRSClsrStrtEnd").value, 10) === 0) {
		cond.op = getId("cbRSClsr").checked;
	} else {
		cond.op = (parseInt(getId("opRSClsrStrtEnd").value, 10) - 1) * 6 + parseInt(getId("opRSClsrBeforeAter").value, 10) * 2 + (getId("cbRSClsr").checked?0:1);
	}
	cond.txt = getId("inRSClsrDays").value;
	addCondition(cond);
}


function makeUpdtd(ev)
{
	var cond = new Object();
	cond.type = "Updtd";
	cond.op = getId("opRSUpdtd").value;
	cond.txt = getId("inRSUpdtd").value;
	addCondition(cond);
}


function makeCrtd(ev)
{
	var cond = new Object();
	cond.type = "Crtd";
	cond.op = getId("opRSCrtd").value;
	cond.txt = getId("inRSCrtd").value;
	addCondition(cond);
}


function makeLastU(ev)
{
	var cond = new Object();
	cond.type = "LastU";
	cond.op = getId("opRSLastU").value;
	cond.txt = getId("inRSLastU").value;
	if (isNaN(parseInt(cond.txt, 10))) {
		cond.txt = '1';
	}
	addCondition(cond);
}


function makeSegId(ev)
{
	var cond = new Object();
	cond.type = "SegId";
	cond.op = getId("opRSSegId").value;
	cond.txt = getId("inRSSegId").value;
	addCondition(cond);
}


function makeAnd(ev)
{
	var op = new Object();
	op.type = "And";
	if (ExprTree.type === "Or") {
		if (typeof (ExprTree.R) !== 'undefined') {
			op.L = ExprTree.R;
		}
		ExprTree.R = op;
	} else {
		op.L = ExprTree;
		ExprTree = op;
	}
	ExprStatus = 0;
	displayStatus ();
}


function makeOr(ev)
{
	var op = new Object();
	op.type = "Or";
	op.L = ExprTree;
	ExprTree = op;
	ExprStatus = 0;
	displayStatus ();
}


function makeNot(ev)
{
	var op = new Object();
	op.type = "Not";
	if (typeof (ExprTree.type) === 'undefined') {
		ExprTree = op;
	} else {
		if (typeof (ExprTree.R) === 'undefined') {
			ExprTree.R = op;
		} else {
			ExprTree.R.R = op;
		}
	}
	ExprStatus = 2;
	displayStatus ();
}


function makeLBkt(ev)
{
	if (ExprStatus === 1) {
		makeAnd();
	}
	BktTrees[BktCount] = ExprTree;
	ExprTree = new Object;
	BktCount ++;
	ExprStatus = 0;
	displayStatus ();
}


function makeRBkt(ev)
{
	BktCount --;
	var cond = new Object();
	cond.type = "Bkt";
	cond.L = ExprTree;
	ExprTree = BktTrees[BktCount];
	ExprStatus = 0;
	addCondition(cond);
}


function selectRoads()
{
	getId("btnRSSelect").disabled = true;
	getId("btnRSSelect").style.background='#F00000';
	
	setTimeout(selectRoads2, 100);
}


function selectRoads2()
{
	var foundSegs = new Array();
	var selected = 0;
	var max_sel_txt = getId("inRSLimit").value;
	var max_sel = parseInt(max_sel_txt, 10);

	 for (var seg in Waze.model.segments.objects) {
		 var segment = Waze.model.segments.get(seg);
		 if (segment.arePropertiesEditable() || !getId("cbRSEditable").checked) {
			if (checkExpr(ExprTree, segment)) {
				foundSegs.push(segment);
				selected++;
				if ((getId("cbRSLimit").checked) && (selected === max_sel)) {
					break;
				}
			}
		}
	}
	Waze.selectionManager.select(foundSegs);
	
	getId("btnRSSelect").style.background='#E9E9E9';
	getId("btnRSSelect").disabled = false;
}


function clearExpr(ev)
{
	ExprStatus = 0;
	ExprTree = new Object();
	BktCount = 0;
	displayStatus ();
}

function delLast(ev)
{
	if (typeof (ExprTree.type) === 'undefined') {
		if (BktCount > 0) {
			BktCount--;
			ExprTree = BktTrees[BktCount];
			if (ExprTree.type === "Not") {
				ExprStatus = 2;
			} else {
				ExprStatus = 0;
			}
		}
	} else {
		switch (ExprTree.type) {
			case "And":
				if (typeof (ExprTree.R) === 'undefined') {
					ExprTree = ExprTree.L;
					ExprStatus = 1;
				} else {
					if (ExprTree.R.type === "Bkt") {
						BktTrees[BktCount] = ExprTree;
						ExprTree = ExprTree.R.L;
						delete BktTrees[BktCount].R;
						BktCount ++;
						ExprStatus = 1;
					} else if (ExprTree.R.type === "Not") {
						if (typeof (ExprTree.R.R) === 'undefined') {
							delete ExprTree.R;
							ExprStatus = 0;
						} else {
							delete ExprTree.R.R;
							ExprStatus = 2;
						}
					} else {
						delete ExprTree.R;
						ExprStatus = 0;
					}
				}
				break;
			case "Or":
				if (typeof (ExprTree.R) === 'undefined') {
					ExprTree = ExprTree.L;
					ExprStatus = 1;
				} else {
					if (ExprTree.R.type === "Bkt") {
						BktTrees[BktCount] = ExprTree;
						ExprTree = ExprTree.R.L;
						delete BktTrees[BktCount].R;
						BktCount ++;
						ExprStatus = 1;
					} else if (ExprTree.R.type === "Not") {
						if (typeof (ExprTree.R.R) === 'undefined') {
							delete ExprTree.R;
							ExprStatus = 0;
						} else {
							delete ExprTree.R.R;
							ExprStatus = 2;
						}
					} else if (ExprTree.R.type === "And") {
						if (typeof (ExprTree.R.R) === 'undefined') {
							ExprTree.R = ExprTree.R.L;
							ExprStatus = 1;
						} else {
							delete ExprTree.R.R;
							ExprStatus = 0;
						}
					} else {
						delete ExprTree.R;
						ExprStatus =  0;
					}
				}
				break;
			case "Bkt":
				BktTrees[BktCount] = new Object();
				ExprTree = ExprTree.L;
				BktCount ++;
				ExprStatus = 1;
				break;
			default:
				ExprTree = new Object();
				ExprStatus = 0;
				break;
		}
	}
	displayStatus ();
}


var icon_delete    ="iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggaDwcglEfa9wAAAftJREFUOMvNks1qFEEUhb+q7uqedNMdTJwJdjBRdBYG/4MEsgiGBAIuBBF8D8GXcO/LuHAjQkQJoglOFiN0YH4MKBomM3a6a6rcTOvEyQNYUHA5de5368CF/+Z0CABoU6m3qdRL7a/u19v49XEvgBiHdJ0okUo1AExRXLsw7HUAuipOpF9p4EjMcf+PDiDLooVXla67X1tdiWqrK5FwZKOFWmghF6TyGrUnj6PaveVIuu5+C686ARDIEPDRQ0x/IKp3bsfKD7dVOLtdfbAVm88NQZ4D+CPvZISOCNek6748f+tGBUAIgaxfZdhsgrF8+7ibGa23Ett/PQHoEJAwoE1l2VH+q9mb16etMWAtwnH4/mnvaFicbMyT7ZTeUxESBnQImCfbkWHYtkWBLQqs1litAdr/Np8ClA+HYbU7u762NMwyjLVYaxme5Exfubz01Y275aCJCCl4U9HcQe3Rw7nB23cCY+ilBz8sEF9aPAcglbJHzeZhURwvXsTkp36g8BLhyJlf73cQ1tpemmZG5xtW5xu9NM2EENZqDZYZiZ+cuY2pCO533TjrunG2J4LN0QC5K4LNUv8igvXxnjKCkDBlIHqBt55h1TOKD4A38uTPUXc9hH5K/kbAwMJPoBBjIAVEgA+4o+YyogX02O0DA0CLM5KIs5ZsBJmofwPkNtFJWyXQAQAAAABJRU5ErkJggg==";

function loadCss() {
	var cssEl = document.createElement("style");
	cssEl.type = "text/css";
	var css = ".divRSRow { clear:both; line-height:16px; height: 20px; text-indent:5px; border: 1px solid;  border-top:0;}";
	css += ".divRSRow0 { clear:both; line-height:16px; height: 20px; text-indent:5px; border: 1px solid; }";
	css += ".divRSName { float:left; text-align:left; padding-left:0px; width:240px; }";
	css += ".divRSDel { float:right; width:20px; padding-top :1px; }";
	cssEl.innerHTML = css;
	document.body.appendChild(cssEl);
}

function genSavedHTML ()
{
	getId('RSsavedTable').innerHTML="";
	for (var i = 0; i < SavedQueries.length; i++) {
		var savedRow = document.createElement('div');
		if (i == 0) {
			savedRow.className="divRSRow0";
		} else {
			savedRow.className="divRSRow";
		}
		savedRow.id="RSsavedRow_"+i;
		
		var namediv = document.createElement('div');
		namediv.className="divRSName";
		
		var namea = document.createElement('a');
		namea.innerHTML="<b>"+SavedQueries[i].name+"</b>";
		namea.href = "#";
		namea.onclick = getFunctionWithArgs(selectRow, [i]);
		namediv.appendChild(namea);
		savedRow.appendChild(namediv);
		
		var deletediv = document.createElement('div');
		deletediv.className="divRSDel";
		var deletea = document.createElement('a');
		deletea.innerHTML="<img title='delete' src='data:image/png;base64," +icon_delete +"' />"; 
		deletea.href = "#";
		deletea.onclick = getFunctionWithArgs(deleteRow, [i]);
		deletediv.appendChild(deletea);
		savedRow.appendChild(deletediv); 

		getId('RSsavedTable').appendChild(savedRow);
	}
}

var SavedQueries = [];

function makeSave(ev)
{
	var name = getId("inRSSaveName").value.substring(0,40);
	var query = {
		name: name,
		ExprStatus: ExprStatus,
		ExprTree: clone(ExprTree),
		BktTrees: clone(BktTrees),
		BktCount: BktCount
	}
	var done = false;
	for (var i = 0; i < SavedQueries.length; i++) {
		if (SavedQueries[i].name === name) {
			SavedQueries[i] = query;
			done = true;
			break;
		}
		if (SavedQueries[i].name > name) {
			SavedQueries.splice(i, 0, query);
			done = true;
			break;
		}
	}
	if (!done) {
		SavedQueries.push(query);
	}
	localStorage.WMERoadSelector = JSON.stringify(SavedQueries);
	genSavedHTML();
}


function selectRow(id)
{
	ExprStatus = SavedQueries[id].ExprStatus;
	ExprTree = clone(SavedQueries[id].ExprTree);
	BktTrees = clone(SavedQueries[id].BktTrees);
	BktCount = SavedQueries[id].BktCount;
	getId("inRSSaveName").value = SavedQueries[id].name;
	displayStatus ();
}


function deleteRow(id)
{
	SavedQueries.splice(id, 1);
	localStorage.WMERoadSelector = JSON.stringify(SavedQueries);
	genSavedHTML();
}


function getElementsByClassName(classname, node)
{
	if(!node) {
		node = document.getElementsByTagName("body")[0];
	}
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for (var i=0,j=els.length; i<j; i++) {
		if (re.test(els[i].className)) {
			 a.push(els[i]);
		 }
	 }
	return a;
}


function getFunctionWithArgs(func, args) {
    return (
        function () {
            var json_args = JSON.stringify(args);
            return function() {
                var args = JSON.parse(json_args);
                func.apply(this, args);
            }
        }
    )();
}


function getId(node)
{
	return document.getElementById(node);
}


function clone(obj) {
	var copy;
	if (null == obj || "object" != typeof obj) return obj;
	if (obj instanceof Date) {
		copy = new Date();
		copy.setTime(obj.getTime());
		return copy;
	}
	if (obj instanceof Array) {
		copy = [];
		for (var i = 0, len = obj.length; i < len; i++) {
			copy[i] = clone(obj[i]);
		}
		return copy;
	}
	if (obj instanceof Object) {
		copy = {};
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
		}
		return copy;
	}
    throw new Error("Unable to copy obj! Its type isn't supported.");
}


function roadSelector_init()
{
	if (localStorage.WMERoadSelector) {
		SavedQueries = JSON.parse(localStorage.WMERoadSelector);
	}
	loadCss();

	var lang = unsafeWindow.I18n.locale;
	var addon = document.createElement('section');
	addon.id = "roadselector-addon";

	if (lang === 'cs' || lang === 'sk') {
		addon.innerHTML  = '<b><u><a href="https://www.waze.com/forum/viewtopic.php?f=22&t=101365" target="_blank">WME Road Selector</a></u></b> &nbsp; v' + roadSelector_version;
	} else {
		addon.innerHTML  = '<b><u><a href="https://www.waze.com/forum/viewtopic.php?f=819&t=112497" target="_blank">WME Road Selector</a></u></b> &nbsp; v' + roadSelector_version;
	}

	var section = document.createElement('p');
	section.style.paddingTop = "8px";
	section.style.textIndent = "16px";
	section.style.fontSize = "10px";
	section.style.textIndent = "0px";
	section.id = "RSselection";
	section.innerHTML  = '<font size=3>Selection</font><br>'
						+ '<output id="outRSExpr"></output><br>'
						+ '<input type="checkbox" id="cbRSEditable" style="padding:0px 0px; height:20px" checked /><b>   Editable only</b>;&nbsp;&nbsp;'
						+ '<input type="checkbox" id="cbRSCaseSens" style="padding:0px 0px; height:20px" checked/><b>Case sensitive</b><br>'
						+ '<input type="checkbox" id="cbRSLimit" style="padding:0px 0px; height:20px" /><b>Limit # of segs</b>&nbsp;'
						+ '<input type="number" min="1" max="999" value="100" id="inRSLimit" size=3 style="padding:0px 0px; height:20px; display:inline-block"/><br><br>'
						+ '<button class="btn btn-default" id="btnRSSelect" style="padding:0px 10px; height:30px">   Select roads   </button>&nbsp;&nbsp;&nbsp;'
						+ '<button class="btn btn-default" id="btnRSClear" style="padding:0px 10px; height:20px">  Clear   </button>&nbsp;&nbsp;&nbsp;'
						+ '<button class="btn btn-default" id="btnRSDel" style="padding:0px 10px; height:20px">  Delete last   </button>'
					 ;
	addon.appendChild(section);

	var tabs = document.createElement("ul");
	addon.appendChild(tabs);
	tabs.id = "roadselector-tabs";
	tabs.className = "nav nav-tabs";
	tabs.innerHTML = '<li class="active" style="width: 50%; text-align: center; height: 30px;"><a style="height: 30px;" href="#roadselector-tabs-editor" data-toggle="tab">Editor</a></li>';
	tabs.innerHTML += '<li class="" style="width: 50%; text-align: center; height: 30px;"><a style="height: 30px;" href="#roadselector-tabs-saved" data-toggle="tab">Saved</a></li>';
	tabcont = document.createElement("div");
	tabcont.className = "tab-content";
	tabcont.id = "roadselector-tab-content";
	tabcont.style.paddingBottom = "10px";
	tabcont.style.paddingTop = "10px";
	tabcont.style.paddingLeft = "5px";
	tabcont.style.paddingRight = "5px";
	addon.appendChild(tabcont);
	var tabpane = document.createElement("section");
	tabpane.className = "tab-pane active";
	tabpane.id = "roadselector-tabs-editor";
	tabcont.appendChild(tabpane);

	section = document.createElement('p');
	section.style.paddingTop = "8px";
	section.style.textIndent = "16px";
	section.style.fontSize = "10px";
	section.style.textIndent = "0px";
	section.id = "RSoperations";
	section.innerHTML  = '<font size=3>Operations</font><br>'
						+ '<button class="btn btn-default" id="btnRSAnd" style="padding:0px 10px; height:20px">AND</button>&nbsp;'
						+ '<button class="btn btn-default" id="btnRSOr" style="padding:0px 10px; height:20px">OR</button>&nbsp;'
						+ '<button class="btn btn-default" id="btnRSNot" style="padding:0px 10px; height:20px"> ! </button>&nbsp;'
						+ '<button class="btn btn-default" id="btnRSLBkt" style="padding:0px 10px; height:20px"> ( </button>&nbsp;'
						+ '<output id="outRSNumBkt" style="padding:0px 0px; height:20px; display:inline-block">0</output>&nbsp;'
						+ '<button class="btn btn-default" id="btnRSRBkt" style="padding:0px 10px; height:20px"> ) </button>'
					 ;
	tabpane.appendChild(section);

	section = document.createElement('p');
	section.style.paddingTop = "8px";
	section.style.textIndent = "16px";
	section.style.fontSize = "9px";
	section.style.textIndent = "0px";
	section.id = "RSconditions";
	str  = '<font size=3>Conditions</font>'
					 + '<table width=100% rules=rows>'
					 + '<tr><td><b>Country</b>&nbsp;<select id="opRSCountry" style="padding:0px 0px; height:20px"></select>&nbsp;'
						+ '<select id="selRSCountry" style="padding:0px 0px; height:20px"></select></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddCountry" style="padding:0px 10px; height:20px">Add</button></td></tr>';
	if (hasStates) {
		str  += '<tr><td><b>State</b>&nbsp;<select id="opRSState" style="padding:0px 0px; height:20px"></select>&nbsp;'
							+ '<input  type="text" id="inRSState" size=10 style="padding:0px 0px; height:20px" /></td>'
							+ '<td><button class="btn btn-default" id="btnRSAddState" style="padding:0px 10px; height:20px">Add</button></td></tr>';
	}
	str  += '<tr><td><b>City</b>&nbsp;<select id="opRSCity" style="padding:0px 0px; height:20px"></select>&nbsp;'
						+ '<input  type="text" id="inRSCity" size=10 style="padding:0px 0px; height:20px" /></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddCity" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>Street</b>&nbsp;<select id="opRSStreet" style="padding:0px 0px; height:20px"></select>&nbsp;'
						+ '<input type="text" id="inRSStreet" size=10 style="padding:0px 0px; height:20px" /></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddStreet" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>Unnamed segment</b>&nbsp;<input type="checkbox" id="cbRSNoName" style="padding:0px 0px" checked /></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddNoName" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>Alternate name (City or Street)</b>&nbsp;<input type="checkbox" id="cbRSAlter" style="padding:0px 0px" /></td></tr>'
					 + '<tr><td><b>Road type</b>&nbsp;<select id="opRSRoadType" style="padding:0px 0px; height:20px"></select>&nbsp;'
						+ '<select id="selRSRoadType" style="padding:0px 0px; height:20px"></select></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddRoadType" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>Roundabout</b>&nbsp;<input type="checkbox" id="cbRSIsRound" style="padding:0px 0px" checked /></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddIsRound" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>Toll Road</b>&nbsp;<input type="checkbox" id="cbRSIsToll" style="padding:0px 0px" checked /></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddIsToll" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>Direction</b>&nbsp;<select id="opRSDirection" style="padding:0px 0px; height:20px"></select>&nbsp;'
						+ '<select id="selRSDirection" style="padding:0px 0px; height:20px"></select></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddDirection" style="padding:0px 10px; height:20px">Add</button>'
					 + '<tr><td><b>Elevation</b>&nbsp;<select id="opRSElevation" style="padding:0px 0px; height:20px"></select>&nbsp;'
						+ '<select id="selRSElevation" style="padding:0px 0px; height:20px"></select></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddElevation" style="padding:0px 10px; height:20px">Add</button>'
					 + '<tr><td><b>Tunnel</b>&nbsp;<input type="checkbox" id="cbRSTunnel" style="padding:0px 0px" checked /></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddTunnel" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>Manual Lock</b>&nbsp;<select id="opRSManLock" style="padding:0px 0px; height:20px"></select>&nbsp;'
						+ '<select id="selRSManLock" style="padding:0px 0px; height:20px"></select></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddManLock" style="padding:0px 10px; height:20px">Add</button>'
					 + '<tr><td><b>Trafic Lock</b>&nbsp;<select id="opRSTrLock" style="padding:0px 0px; height:20px"></select>&nbsp;'
						+ '<select id="selRSTrLock" style="padding:0px 0px; height:20px"></select></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddTrLock" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>Speed limit</b>&nbsp;<select id="opRSSpeed" style="padding:0px 0px; height:20px"></select> <b>dir.</b> '
						+ '<input  type="text" id="inRSSpeed" size=4 style="padding:0px 0px; height:20px" /> <b>' + (speedInMiles?'mph':'km/h') +'</b></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddSpeed" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>New</b>&nbsp;<input type="checkbox" id="cbRSIsNew" style="padding:0px 0px" checked /></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddIsNew" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>Changed</b>&nbsp;<input type="checkbox" id="cbRSIsChngd" style="padding:0px 0px" checked /></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddIsChngd" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>On Screen</b>&nbsp;<input type="checkbox" id="cbRSOnScr" style="padding:0px 0px" checked /></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddOnScr" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>Has restriction</b>&nbsp;<input type="checkbox" id="cbRSRestr" style="padding:0px 0px" checked /></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddRestr"" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>Has closure</b>&nbsp;<input type="checkbox" id="cbRSClsr" style="padding:0px 0px" checked />&nbsp;'
						+ '<select id="opRSClsrStrtEnd" style="padding:0px 0px; height:20px"><option value="0">---</option><option value="1">starts</option><option value="2">ends</option></select><br>'
						+ '<select id="opRSClsrBeforeAter" style="padding:0px 0px; height:20px"><option value="0">before</option><option value="1">after</option><option value="2">in</option></select>&nbsp;'
						+ '<input  type="number" min="-365" max="365" value="1" id="inRSClsrDays" size=3 style="padding:0px 0px; height:20px; display:inline-block"/>&nbsp;<b>days</b></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddClsr"" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>Updated by</b>&nbsp;<select id="opRSUpdtd" style="padding:0px 0px; height:20px"></select>&nbsp;'
						+ '<input  type="text" id="inRSUpdtd" size=8 style="padding:0px 0px; height:20px" /></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddUpdtd" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>Created by</b>&nbsp;<select id="opRSCrtd" style="padding:0px 0px; height:20px"></select>&nbsp;'
						+ '<input  type="text" id="inRSCrtd" size=8 style="padding:0px 0px; height:20px" /></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddCrtd" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>Last update</b>&nbsp;<select id="opRSLastU" style="padding:0px 0px; height:20px"></select>&nbsp;'
						+ '<input  type="number" min="0" max="365" value="1" id="inRSLastU" size=3 style="padding:0px 0px; height:20px; display:inline-block"/>&nbsp;<b> days ago</b></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddLastU" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '<tr><td><b>ID</b>&nbsp;<select id="opRSSegId" style="padding:0px 0px; height:20px"></select>&nbsp;'
						+ '<input type="text" id="inRSSegId" size=25 style="padding:0px 0px; height:20px"/></td>'
						+ '<td><button class="btn btn-default" id="btnRSAddSegId" style="padding:0px 10px; height:20px">Add</button></td></tr>'
					 + '</table>';
	section.innerHTML = str;
	tabpane.appendChild(section);

	tabpane = document.createElement("section");
	tabpane.className = "tab-pane";
	tabpane.id = "roadselector-tabs-saved";
	tabcont.appendChild(tabpane);

	section = document.createElement('p');
	section.style.paddingTop = "8px";
	section.style.textIndent = "16px";
	section.style.fontSize = "10px";
	section.style.textIndent = "0px";
	section.id = "RSsavedHdr";
	section.innerHTML  = '<table width=100% rules=rows>'
					 + '<tr><td><input type="text" id="inRSSaveName" size=30 style="padding:0px 0px; height:20px" /></td>'
					 + '<td><button class="btn btn-default" id="btnRSSave" style="padding:0px 10px; height:20px">Save</button></td></tr>'
					 + '</table>';
	tabpane.appendChild(section);

	section = document.createElement('p');
	section.style.paddingTop = "8px";
	section.style.textIndent = "16px";
	section.style.fontSize = "10px";
	section.style.textIndent = "0px";
	section.id = "RSsaved";
	var savedTable = "<div id='RSsavedTable'></div>"
	section.innerHTML  = savedTable;
	tabpane.appendChild(section);

	var userTabs = getId('user-info');
	var navTabs = getElementsByClassName('nav-tabs', userTabs)[0];
	var tabContent = getElementsByClassName('tab-content', userTabs)[0];

	newtab = document.createElement('li');
	newtab.innerHTML = '<a href="#sidepanel-roadselector" data-toggle="tab" title="Road Selector">RSel</a>';
	navTabs.appendChild(newtab);

	addon.id = "sidepanel-roadselector";
	addon.className = "tab-pane";
	tabContent.appendChild(addon);

	genSavedHTML();

	populateEqualOps("opRSCountry");
	populateCountries("selRSCountry");
	if (hasStates) {
		populateStringOps("opRSState");
	}
	populateStringOps("opRSCity");
	populateStringOps("opRSStreet");
	populateEqualOps("opRSRoadType");
	populateRoadTypes("selRSRoadType");
	populateEqualOps("opRSDirection");
	populateDirections("selRSDirection");
	populateIntegerOps("opRSElevation");
	populateElevations("selRSElevation");
	populateIntegerOps("opRSManLock");
	populateLocks("selRSManLock");
	populateIntegerOps("opRSTrLock");
	populateLocks("selRSTrLock");
	populateDirOps("opRSSpeed");
	populateStringOps("opRSUpdtd");
	populateStringOps("opRSCrtd");
	populateIntegerOps("opRSLastU");
	populateEqualOps("opRSSegId");

	displayStatus ();


	getId("btnRSAddCountry").onclick = makeCountry;
	if (hasStates) {
		getId("btnRSAddState").onclick = makeState;
	}
	getId("btnRSAddCity").onclick = makeCity;
	getId("btnRSAddStreet").onclick = makeStreet;
	getId("btnRSAddNoName").onclick = makeNoName;
	getId("btnRSAddRoadType").onclick = makeRoadType;
	getId("btnRSAddIsRound").onclick = makeIsRound;
	getId("btnRSAddIsToll").onclick = makeIsToll;
	getId("btnRSAddDirection").onclick = makeDirection;
	getId("btnRSAddElevation").onclick = makeElevation;
	getId("btnRSAddTunnel").onclick = makeTunnel;
	getId("btnRSAddManLock").onclick = makeManLock;
	getId("btnRSAddTrLock").onclick = makeTrLock;
	getId("btnRSAddSpeed").onclick = makeSpeed;
	getId("btnRSAddIsNew").onclick = makeIsNew;
	getId("btnRSAddIsChngd").onclick = makeIsChngd;
	getId("btnRSAddOnScr").onclick = makeOnScr;
	getId("btnRSAddRestr").onclick = makeRestr;
	getId("btnRSAddClsr").onclick = makeClsr;
	getId("btnRSAddUpdtd").onclick = makeUpdtd;
	getId("btnRSAddCrtd").onclick = makeCrtd;
	getId("btnRSAddLastU").onclick = makeLastU;
	getId("btnRSAddSegId").onclick = makeSegId;
	getId("btnRSAnd").onclick = makeAnd;
	getId("btnRSOr").onclick = makeOr;
	getId("btnRSNot").onclick = makeNot;
	getId("btnRSLBkt").onclick = makeLBkt;
	getId("btnRSRBkt").onclick = makeRBkt;
	getId("btnRSSelect").onclick = selectRoads;
	getId("btnRSClear").onclick = clearExpr;
	getId("btnRSDel").onclick = delLast;
	getId("btnRSSave").onclick = makeSave;
	
	if (SavedQueries.length > 0) {
		$('#roadselector-tabs a[href="#roadselector-tabs-saved"]').tab('show');
	}

}


function roadSelector_wait()
{
	if ((typeof(Waze.model.countries.objects) === 'undefined') || (Object.keys(Waze.model.countries.objects).length === 0)) {
		setTimeout(roadSelector_wait, 500);
	} else {
		hasStates = Waze.model.hasStates();
		speedInMiles = Waze.model.isImperial;
		roadSelector_init();
	}
}


function roadSelector_bootstrap()
{
	var bGreasemonkeyServiceDefined 	= false;

	try
	{
		bGreasemonkeyServiceDefined = ("object" === typeof Components.interfaces.gmIGreasemonkeyService)
	}
	catch (err)
	{ /* Ignore */ }

	if ( "undefined" === typeof unsafeWindow  ||  ! bGreasemonkeyServiceDefined)
	{
		unsafeWindow	= ( function ()
		{
			var dummyElem	= document.createElement('p');
			dummyElem.setAttribute ('onclick', 'return window;');
			return dummyElem.onclick ();
		} ) ();
	}
	
	setTimeout(roadSelector_wait, 1500);
}


roadSelector_bootstrap();

