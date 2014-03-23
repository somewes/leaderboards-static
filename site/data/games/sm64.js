define({
    "id": "GAMESM64",
    "name": "Super Mario 64",
    "abbreviation": "sm64",
    "platforms": ["PLATN64", "PLATWIIVC"],
    "tags": {
    	"Category": {
    		"type": "list",
    		"timed": true,
    		"value": [
    			"0 star",
    			"1 star",
				"16 star",
    			"70 star",
    			"120 star"
    		]
    	},
		"Region": {
    		"type": "list",
    		"timed": true,
			"value": [
    			"US",
    			"JP"
    		]
    	},
    	"BLJ": {
    		"type": "boolean",
    		"timed": true
    	},
		"Emulator": {
    		"type": "list",
    		"timed": true,
			"value": [
    			"No",
    			"Project 64 v1.6",
    			"Project 64 v1.7"
    		]
    	},
    	"Controller": {
    		"type": "list",
    		"timed": false,
    		"value": [
    			"Factory",
    			"Hori",
				"Multiple"
    		]
    	}
    },
    "filters": [
    	{
    		"name": "0 star",
    		"filter": {
				"all": {
					"Category": "0 star",
					"BLJ": true
				}
			}
    	},
    	{
    		"name": "1 star",
    		"filter": {
				"all": {
					"Category": "1 star",
					"BLJ": true
				}
			}
    	},
    	{
    		"name": "16 star",
    		"filter": {
				"all": {
					"Category": "16 star",
					"BLJ": true
				}
			}
    	},
    	{
    		"name": "70 star",
    		"filter": {
				"all": {
    				"Category": "70 star"
				}
    		}
    	},
    	{
    		"name": "100%",
    		"filter": {
				"all": {
    				"Category": "120 star"
				}
    		}
    	}
    ],
    "runs": [
    	{
    		"runner": "Akira",
    		"time": 419000,
    		"platform": "PLATN64",
    		"tags": {
    			"Category": "0 star",
				"Region": "JP",
    			"BLJ": true,
				"Emulator": "No"
    		}
    	},
    	{
    		"runner": "Funila",
    		"time": 441000,
    		"platform": "PLATN64",
    		"tags": {
    			"Category": "0 star",
				"Region": "US",
    			"BLJ": true,
				"Emulator": "No"
    		}
    	},
    	{
    		"runner": "ToT",
    		"time": 458000,
    		"platform": "PLATN64",
    		"tags": {
    			"Category": "0 star",
				"Region": "JP",
    			"BLJ": true,
				"Emulator": "Project 64 v1.7"
    		}
    	},
    	{
    		"runner": "ParadoxKarl",
    		"time": 517000,
    		"platform": "PLATWIIVC",
    		"tags": {
    			"Category": "0 star",
				"Region": "US",
    			"BLJ": true,
				"Emulator": "No"
    		}
    	},
    	{
    		"runner": "biinny",
    		"time": 1698000,
    		"platform": "PLATN64",
    		"tags": {
    			"Category": "0 star",
				"Region": "JP",
    			"BLJ": false,
				"Emulator": "No"
    		}
    	},
    	{
    		"runner": "Xiah",
    		"time": 456420,
    		"platform": "PLATN64",
    		"tags": {
    			"Category": "1 star",
				"Region": "JP",
    			"BLJ": true,
				"Emulator": "No"
    		}
    	},
		{
    		"runner": "Paradox Karl",
    		"time": 486000,
    		"platform": "PLATWIIVC",
    		"tags": {
    			"Category": "1 star",
				"Region": "US",
    			"BLJ": true,
				"Emulator": "No"
    		}
    	},
    	{
    		"runner": "Funila",
    		"time": 487000,
    		"platform": "PLATN64",
    		"tags": {
    			"Category": "1 star",
				"Region": "US",
    			"BLJ": true,
				"Emulator": "No"
    		}
    	},	
    	{
    		"runner": "Akira",
    		"time": 944440,
    		"platform": "PLATN64",
    		"tags": {
    			"Category": "16 star",
				"Region": "JP",
    			"BLJ": true,
				"Emulator": "No",
				"Controller": "Factory"
    		}
    	},
    	{
    		"runner": "ShadowOfMyles",
    		"time": 1051000,
    		"platform": "PLATN64",
    		"tags": {
    			"Category": "16 star",
				"Region": "US",
    			"BLJ": true,
				"Emulator": "No",
				"Controller": "Factory"
    		}
    	},
    	{
    		"runner": "Alex",
    		"time": 946000,
    		"platform": "PLATWIIVC",
    		"tags": {
    			"Category": "16 star",
				"Region": "US",
    			"BLJ": true,
				"Emulator": "No"
    		}
    	},
    	{
    		"runner": "Siglemic",
    		"time": 2908000,
    		"platform": "PLATWIIVC",
    		"tags": {
    			"Category": "70 star",
				"Region": "US",
    			"BLJ": false,
				"Emulator": "No"
    		}
    	},
    	{
    		"runner": "Siglemic",
    		"time": 2949000,
    		"platform": "PLATN64",
    		"tags": {
    			"Category": "70 star",
				"Region": "JP",
    			"BLJ": true,
				"Emulator": "No"
    		}
    	},
    	{
    		"runner": "Hyassin27",
    		"time": 2974000,
    		"platform": "PLATN64",
    		"tags": {
    			"Category": "70 star",
				"Region": "US",
    			"BLJ": false,
				"Emulator": "Project 64 v1.6"
    		}
    	},	
    	{
    		"runner": "Siglemic",
    		"time": 6202000,
    		"platform": "PLATWIIVC",
    		"tags": {
    			"Category": "120 star",
				"Region": "US",
    			"BLJ": true,
				"Emulator": "No"
    		}
    	},	
    	{
    		"runner": "Siglemic",
    		"time": 6241000,
    		"platform": "PLATN64",
    		"tags": {
    			"Category": "120 star",
				"Region": "US",
    			"BLJ": false,
				"Emulator": "No"
    		}
    	}
		
    ]
});