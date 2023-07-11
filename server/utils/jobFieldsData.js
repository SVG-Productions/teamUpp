const jobFieldsData = [
  "accounting",
  "acting",
  "actuary",
  "adhesive bonding machine tender",
  "adjudicator",
  "administrative assistance",
  "administrative services management",
  "adult education teacher",
  "advertising management",
  "advertising sales agent",
  "aerobics instructor",
  "aerospace engineering",
  "aerospace engineering technician",
  "agent",
  "agricultural engineering",
  "agricultural equipment operator",
  "agricultural grader",
  "agricultural inspector",
  "agricultural management",
  "agricultural sciences teacher",
  "agricultural sorter",
  "agricultural technician",
  "agricultural worker",
  "air conditioning installer",
  "air conditioning mechanic",
  "air traffic controller",
  "aircraft cargo handling supervisor",
  "aircraft mechanic",
  "aircraft service technician",
  "airline copilot",
  "airline pilot",
  "ambulance dispatcher",
  "ambulance driver",
  "amusement machine servicer",
  "anesthesiologist",
  "animal breeder",
  "animal control worker",
  "animal scientist",
  "animal trainer",
  "animator",
  "answering service operator",
  "anthropologist",
  "apparel patternmaker",
  "apparel worker",
  "arbitrator",
  "archeologist",
  "architect",
  "architectural drafter",
  "architectural management",
  "archivist",
  "art director",
  "art teacher",
  "artist",
  "assembler",
  "astronomer",
  "athlete",
  "athletic trainer",
  "ATM machine repairer",
  "atmospheric scientist",
  "attendant",
  "audio and video equipment technician",
  "audio-visual and multimedia collections specialist",
  "audiologist",
  "auditor",
  "author",
  "auto damage insurance appraiser",
  "automotive and watercraft service attendant",
  "automotive glass installer",
  "automotive mechanic",
  "avionics technician",
  "back-end development",
  "baggage porter",
  "bailiff",
  "baker",
  "barback",
  "barber",
  "bartender",
  "basic education teacher",
  "behavioral disorder counselor",
  "bellhop",
  "bench carpenter",
  "bicycle repairer",
  "bill and account collector",
  "billing and posting clerk",
  "biochemist",
  "biological technician",
  "biomedical engineering",
  "biophysicist",
  "blaster",
  "blending machine operator",
  "blockmason",
  "boiler operator",
  "boilermaker",
  "bookkeeper",
  "boring machine tool tender",
  "brazer",
  "brickmason",
  "bridge and lock tender",
  "broadcast news analyst",
  "broadcast technician",
  "brokerage clerk",
  "budget analyst",
  "building inspector",
  "bus mechanic",
  "butcher",
  "buyer",
  "cabinetmaker",
  "cafeteria attendant",
  "cafeteria cook",
  "camera operator",
  "camera repairer",
  "cardiovascular technician",
  "cargo agent",
  "carpenter",
  "carpet installer",
  "cartographer",
  "cashier",
  "caster",
  "ceiling tile installer",
  "cellular equipment installer",
  "cement mason",
  "channeling machine operator",
  "chauffeur",
  "checker",
  "chef",
  "chemical engineering",
  "chemical plant operator",
  "chemist",
  "chemistry teacher",
  "chief executive",
  "child social worker",
  "childcare worker",
  "chiropractor",
  "choreographer",
  "civil drafter",
  "civil engineering",
  "civil engineering technician",
  "claims adjuster",
  "claims examiner",
  "claims investigator",
  "cleaner",
  "clinical laboratory technician",
  "clinical laboratory technologist",
  "clinical psychologist",
  "coating worker",
  "coatroom attendant",
  "coil finisher",
  "coil taper",
  "coil winder",
  "coin machine servicer",
  "commercial diver",
  "commercial pilot",
  "commodities sales agent",
  "communications equipment operator",
  "communications teacher",
  "community association management",
  "community service management",
  "compensation and benefits management",
  "compliance officer",
  "composer",
  "computer hardware engineering",
  "computer network architect",
  "computer operator",
  "computer programmer",
  "computer science teacher",
  "computer support specialist",
  "computer systems administrator",
  "computer systems analyst",
  "concierge",
  "conciliator",
  "concrete finisher",
  "conservation science teacher",
  "conservation scientist",
  "conservation worker",
  "conservator",
  "construction inspector",
  "construction management",
  "construction painter",
  "construction worker",
  "continuous mining machine operator",
  "convention planner",
  "conveyor operator",
  "cook",
  "cooling equipment operator",
  "copy marker",
  "correctional officer",
  "correctional treatment specialist",
  "correspondence clerk",
  "correspondent",
  "cosmetologist",
  "cost estimator",
  "costume attendant",
  "counseling psychologist",
  "counselor",
  "courier",
  "court reporter",
  "craft artist",
  "crane operator",
  "credit analyst",
  "credit checker",
  "credit counselor",
  "criminal investigator",
  "criminal justice teacher",
  "crossing guard",
  "curator",
  "custom sewer",
  "customer service representative",
  "cutter",
  "cutting machine operator",
  "dancer",
  "data entry keyer",
  "database administrator",
  "decorating worker",
  "delivery services driver",
  "demonstrator",
  "dental assistant",
  "dental hygienist",
  "dental laboratory technician",
  "dentist",
  "dermatologist",
  "derrick operator",
  "designer",
  "desktop publisher",
  "detective",
  "development",
  "dev ops",
  "diagnostic medical sonographer",
  "die maker",
  "diesel engine specialist",
  "dietetic technician",
  "dietitian",
  "dinkey operator",
  "director",
  "dishwasher",
  "dispatcher",
  "DJ",
  "doctor",
  "door-to-door sales worker",
  "drafter",
  "dragline operator",
  "drama teacher",
  "dredge operator",
  "dressing room attendant",
  "dressmaker",
  "drier operator",
  "drilling machine tool operator",
  "dry-cleaning worker",
  "drywall installer",
  "dyeing machine operator",
  "earth driller",
  "economics teacher",
  "economist",
  "editor",
  "education administrator",
  "electric motor repairer",
  "electrical electronics drafter",
  "electrical engineering",
  "electrical equipment assembler",
  "electrical installer",
  "electrical power-line installer",
  "electrician",
  "electro-mechanical technician",
  "elementary school teacher",
  "elevator installer",
  "elevator repairer",
  "embalmer",
  "emergency management director",
  "emergency medical technician",
  "engine assembler",
  "engineering",
  "engineering management",
  "engineering teacher",
  "english language teacher",
  "engraver",
  "entertainment attendant",
  "environmental engineering",
  "environmental science teacher",
  "environmental scientist",
  "epidemiologist",
  "escort",
  "etcher",
  "event planner",
  "excavating operator",
  "executive administrative assistant",
  "executive secretary",
  "exhibit designer",
  "expediting clerk",
  "explosives worker",
  "extraction worker",
  "fabric mender",
  "fabric patternmaker",
  "fabricator",
  "faller",
  "family practitioner",
  "family social worker",
  "family therapist",
  "farm advisor",
  "farm equipment mechanic",
  "farm labor contractor",
  "farmer",
  "farmworker",
  "fashion designer",
  "fast food cook",
  "fence erector",
  "fiberglass fabricator",
  "fiberglass laminator",
  "file clerk",
  "filling machine operator",
  "film and video editor",
  "financial analyst",
  "financial examiner",
  "financial management",
  "financial services sales agent",
  "fine artist",
  "fire alarm system installer",
  "fire dispatcher",
  "fire inspector",
  "fire investigator",
  "firefighter",
  "fish and game warden",
  "fish cutter",
  "fish trimmer",
  "fisher",
  "fitness studies teacher",
  "fitness trainer",
  "flight attendant",
  "floor finisher",
  "floor layer",
  "floor sander",
  "floral designer",
  "food batchmaker",
  "food cooking machine operator",
  "food preparation worker",
  "food science technician",
  "food scientist",
  "food server",
  "food service management",
  "food technologist",
  "foreign language teacher",
  "foreign literature teacher",
  "forensic science technician",
  "forest fire inspector",
  "forest fire prevention specialist",
  "forest worker",
  "forester",
  "forestry teacher",
  "forging machine setter",
  "foundry coremaker",
  "freight agent",
  "freight mover",
  "front-end development",
  "full-stack development",
  "fundraising management",
  "funeral attendant",
  "funeral director",
  "funeral service management",
  "furnace operator",
  "furnishings worker",
  "furniture finisher",
  "gaming booth cashier",
  "gaming cage worker",
  "gaming change person",
  "gaming dealer",
  "gaming investigator",
  "gaming management",
  "gaming surveillance officer",
  "garment mender",
  "garment presser",
  "gas compressor",
  "gas plant operator",
  "gas pumping station operator",
  "general management",
  "general practitioner",
  "geographer",
  "geography teacher",
  "geological engineering",
  "geological technician",
  "geoscientist",
  "glazier",
  "government program eligibility interviewer",
  "graduate teaching assistant",
  "graphic designer",
  "groundskeeper",
  "groundskeeping worker",
  "gynecologist",
  "hairdresser",
  "hairstylist",
  "hand grinding worker",
  "hand laborer",
  "hand packager",
  "hand packer",
  "hand polishing worker",
  "hand sewer",
  "hazardous materials removal worker",
  "head cook",
  "health and safety engineering",
  "health educator",
  "health information technician",
  "health services management",
  "health specialties teacher",
  "healthcare social worker",
  "hearing officer",
  "heat treating equipment setter",
  "heating installer",
  "heating mechanic",
  "heavy truck driver",
  "highway maintenance worker",
  "historian",
  "history teacher",
  "hoist and winch operator",
  "home appliance repairer",
  "home economics teacher",
  "home entertainment installer",
  "home health aide",
  "home management advisor",
  "host",
  "hostess",
  "hostler",
  "hotel desk clerk",
  "housekeeping cleaner",
  "human resources assistant",
  "human resources management",
  "human service assistant",
  "hunter",
  "hydrologist",
  "illustrator",
  "industrial designer",
  "industrial engineering",
  "industrial engineering technician",
  "industrial machinery mechanic",
  "industrial production management",
  "industrial truck operator",
  "industrial-organizational psychologist",
  "information clerk",
  "information research scientist",
  "information security analyst",
  "information systems management",
  "inspector",
  "instructional coordinator",
  "instructor",
  "insulation worker",
  "insurance claims clerk",
  "insurance sales agent",
  "insurance underwriter",
  "intercity bus driver",
  "interior designer",
  "internist",
  "interpreter",
  "interviewer",
  "investigator",
  "jailer",
  "janitor",
  "jeweler",
  "judge",
  "judicial law clerk",
  "kettle operator",
  "kiln operator",
  "kindergarten teacher",
  "laboratory animal caretaker",
  "landscape architect",
  "landscaping worker",
  "lathe setter",
  "laundry worker",
  "law enforcement teacher",
  "law teacher",
  "lawyer",
  "layout worker",
  "leather worker",
  "legal assistant",
  "legal secretary",
  "legislator",
  "librarian",
  "library assistant",
  "library science teacher",
  "library technician",
  "licensed practical nurse",
  "licensed vocational nurse",
  "life scientist",
  "lifeguard",
  "light truck driver",
  "line installer",
  "literacy teacher",
  "literature teacher",
  "loading machine operator",
  "loan clerk",
  "loan interviewer",
  "loan officer",
  "lobby attendant",
  "locker room attendant",
  "locksmith",
  "locomotive engineering",
  "locomotive firer",
  "lodging management",
  "log grader",
  "logging equipment operator",
  "logistician",
  "machine feeder",
  "machinist",
  "magistrate judge",
  "magistrate",
  "maid",
  "mail clerk",
  "mail machine operator",
  "mail superintendent",
  "maintenance painter",
  "maintenance worker",
  "makeup artist",
  "management analyst",
  "manicurist",
  "manufactured building installer",
  "mapping technician",
  "marble setter",
  "marine engineering",
  "marine oiler",
  "market research analyst",
  "marketing management",
  "marketing specialist",
  "marriage therapist",
  "massage therapist",
  "material mover",
  "materials engineering",
  "materials scientist",
  "mathematical science teacher",
  "mathematical technician",
  "mathematician",
  "maxillofacial surgeon",
  "measurer",
  "meat cutter",
  "meat packer",
  "meat trimmer",
  "mechanical door repairer",
  "mechanical drafter",
  "mechanical engineering",
  "mechanical engineering technician",
  "mediator",
  "medical appliance technician",
  "medical assistant",
  "medical equipment preparer",
  "medical equipment repairer",
  "medical laboratory technician",
  "medical laboratory technologist",
  "medical records technician",
  "medical scientist",
  "medical secretary",
  "medical services management",
  "medical transcriptionist",
  "meeting planner",
  "mental health counselor",
  "mental health social worker",
  "merchandise displayer",
  "messenger",
  "metal caster",
  "metal patternmaker",
  "metal pickling operator",
  "metal pourer",
  "metal worker",
  "metal-refining furnace operator",
  "metal-refining furnace tender",
  "meter reader",
  "microbiologist",
  "middle school teacher",
  "milling machine setter",
  "millwright",
  "mine cutting machine operator",
  "mine shuttle car operator",
  "mining engineering",
  "mining safety engineering",
  "mining safety inspector",
  "mining service unit operator",
  "mixing machine setter",
  "mobile app development",
  "mobile heavy equipment mechanic",
  "mobile home installer",
  "model maker",
  "model",
  "molder",
  "mortician",
  "motel desk clerk",
  "motion picture projectionist",
  "motorboat mechanic",
  "motorboat operator",
  "motorboat service technician",
  "motorcycle mechanic",
  "movers",
  "multimedia artist",
  "museum technician",
  "music director",
  "music teacher",
  "musical instrument repairer",
  "musician",
  "natural sciences management",
  "naval architect",
  "network systems administrator",
  "new accounts clerk",
  "news vendor",
  "nonfarm animal caretaker",
  "nuclear engineering",
  "nuclear medicine technologist",
  "nuclear power reactor operator",
  "nuclear technician",
  "nursing aide",
  "nursing instructor",
  "nursing teacher",
  "nutritionist",
  "obstetrician",
  "occupational health and safety specialist",
  "occupational health and safety technician",
  "occupational therapist",
  "occupational therapy aide",
  "occupational therapy assistant",
  "offbearer",
  "office clerk",
  "office machine operator",
  "operating engineering",
  "operations management",
  "operations research analyst",
  "ophthalmic laboratory technician",
  "optician",
  "optometrist",
  "oral surgeon",
  "order clerk",
  "order filler",
  "orderly",
  "ordnance handling expert",
  "orthodontist",
  "orthotist",
  "other",
  "outdoor power equipment mechanic",
  "oven operator",
  "packaging machine operator",
  "painter ",
  "painting worker",
  "paper goods machine setter",
  "paperhanger",
  "paralegal",
  "paramedic",
  "parking enforcement worker",
  "parking lot attendant",
  "parts salesperson",
  "paving equipment operator",
  "payroll clerk",
  "pediatrician",
  "pedicurist",
  "personal care aide",
  "personal chef",
  "personal financial advisor",
  "personal trainer",
  "pest control worker",
  "pesticide applicator",
  "pesticide handler",
  "pesticide sprayer",
  "petroleum engineering",
  "petroleum gauger",
  "petroleum pump system operator",
  "petroleum refinery operator",
  "petroleum technician",
  "pharmacist",
  "pharmacy aide",
  "pharmacy technician",
  "philosophy teacher",
  "photogrammetrist",
  "photographer",
  "photographic process worker",
  "photographic processing machine operator",
  "physical therapist aide",
  "physical therapist assistant",
  "physical therapist",
  "physician assistant",
  "physician",
  "physicist",
  "physics teacher",
  "pile-driver operator",
  "pipefitter",
  "pipelayer",
  "planing machine operator",
  "planning clerk",
  "plant operator",
  "plant scientist",
  "plasterer",
  "plastic patternmaker",
  "plastic worker",
  "plumber",
  "podiatrist",
  "police dispatcher",
  "police officer",
  "policy processing clerk",
  "political science teacher",
  "political scientist",
  "postal service clerk",
  "postal service mail carrier",
  "postal service mail processing machine operator",
  "postal service mail processor",
  "postal service mail sorter",
  "postmaster",
  "postsecondary teacher",
  "poultry cutter",
  "poultry trimmer",
  "power dispatcher",
  "power distributor",
  "power plant operator",
  "power tool repairer",
  "precious stone worker",
  "precision instrument repairer",
  "prepress technician",
  "preschool teacher",
  "priest",
  "print binding worker",
  "printing press operator",
  "private detective",
  "probation officer",
  "procurement clerk",
  "producer",
  "product promoter",
  "product management",
  "production clerk",
  "production occupation",
  "proofreader",
  "property management",
  "prosthetist",
  "prosthodontist",
  "psychiatric aide",
  "psychiatric technician",
  "psychiatrist",
  "psychologist",
  "psychology teacher",
  "public relations management",
  "public relations specialist",
  "pump operator",
  "purchasing agent",
  "purchasing management",
  "radiation therapist",
  "radio announcer",
  "radio equipment installer",
  "radio operator",
  "radiologic technician",
  "radiologic technologist",
  "rail car repairer",
  "rail transportation worker",
  "rail yard engineering",
  "rail-track laying equipment operator",
  "railroad brake operator",
  "railroad conductor",
  "railroad police",
  "rancher",
  "real estate appraiser",
  "real estate broker",
  "real estate management",
  "real estate sales agent",
  "receiving clerk",
  "receptionist",
  "record clerk",
  "recreation teacher",
  "recreation worker",
  "recreational therapist",
  "recreational vehicle service technician",
  "recyclable material collector",
  "referee",
  "refractory materials repairer",
  "refrigeration installer",
  "refrigeration mechanic",
  "refuse collector",
  "regional planner",
  "registered nurse",
  "rehabilitation counselor",
  "reinforcing iron worker",
  "reinforcing rebar worker",
  "religion teacher",
  "religious activities director",
  "religious worker",
  "rental clerk",
  "repair worker",
  "reporter",
  "residential advisor",
  "resort desk clerk",
  "respiratory therapist",
  "respiratory therapy technician",
  "retail buyer",
  "retail salesperson",
  "revenue agent",
  "rigger",
  "rock splitter",
  "rolling machine tender",
  "roof bolter",
  "roofer",
  "rotary drill operator",
  "roustabout",
  "safe repairer",
  "sailor",
  "sales engineering",
  "sales management",
  "sales representative",
  "sampler",
  "sawing machine operator",
  "scaler",
  "school bus driver",
  "school psychologist",
  "school social worker",
  "scout leader",
  "sculptor",
  "secondary education teacher",
  "secondary school teacher",
  "secretary",
  "securities sales agent",
  "security guard",
  "security system installer",
  "segmental paver",
  "self-enrichment education teacher",
  "semiconductor processor",
  "septic tank servicer",
  "set designer",
  "sewer pipe cleaner",
  "sewing machine operator",
  "shampooer",
  "shaper",
  "sheet metal worker",
  "sheriff's patrol officer",
  "ship captain",
  "ship engineering",
  "ship loader",
  "shipmate",
  "shipping clerk",
  "shoe machine operator",
  "shoe worker",
  "short order cook",
  "signal operator",
  "signal repairer",
  "singer",
  "ski patrol",
  "skincare specialist",
  "slaughterer",
  "slicing machine tender",
  "slot supervisor",
  "social science research assistant",
  "social sciences teacher",
  "social scientist",
  "social service assistant",
  "social service management",
  "social work teacher",
  "social worker",
  "sociologist",
  "sociology teacher",
  "software development",
  "software engineering",
  "soil scientist",
  "solderer",
  "sorter",
  "sound engineering technician",
  "space scientist",
  "special education teacher",
  "speech-language pathologist",
  "sports book runner",
  "sports entertainer",
  "sports performer",
  "stationary engineering",
  "statistical assistant",
  "statistician",
  "steamfitter",
  "stock clerk",
  "stock mover",
  "stonemason",
  "street vendor",
  "streetcar operator",
  "structural iron worker",
  "structural metal fabricator",
  "structural metal fitter",
  "structural steel worker",
  "stucco mason",
  "substance abuse counselor",
  "substance abuse social worker",
  "subway operator",
  "surfacing equipment operator",
  "surgeon",
  "surgical technologist",
  "survey researcher",
  "surveying technician",
  "surveyor",
  "switch operator",
  "switchboard operator",
  "tailor",
  "tamping equipment operator",
  "tank car loader",
  "taper",
  "tax collector",
  "tax examiner",
  "tax preparer",
  "taxi driver",
  "teacher assistant",
  "teacher",
  "team assembler",
  "technical writer",
  "telecommunications equipment installer",
  "telemarketer",
  "telephone operator",
  "television announcer",
  "teller",
  "terrazzo finisher",
  "terrazzo worker",
  "tester",
  "textile bleaching operator",
  "textile cutting machine setter",
  "textile knitting machine setter",
  "textile presser",
  "textile worker",
  "therapist",
  "ticket agent",
  "ticket taker",
  "tile setter",
  "timekeeping clerk",
  "timing device assembler",
  "tire builder",
  "tire changer",
  "tire repairer",
  "title abstractor",
  "title examiner",
  "title searcher",
  "tobacco roasting machine operator",
  "tool filer",
  "tool grinder",
  "tool maker",
  "tool sharpener",
  "tour guide",
  "tower equipment installer",
  "tower operator",
  "track switch repairer",
  "tractor operator",
  "tractor-trailer truck driver",
  "traffic clerk",
  "traffic technician",
  "training and development management",
  "training and development specialist",
  "transit police",
  "translator",
  "transportation equipment painter",
  "transportation inspector",
  "transportation security screener",
  "transportation worker",
  "trapper",
  "travel agent",
  "travel clerk",
  "travel guide",
  "tree pruner",
  "tree trimmer",
  "trimmer",
  "truck loader",
  "truck mechanic",
  "tuner",
  "turning machine tool operator",
  "tutor",
  "typist",
  "umpire",
  "undertaker",
  "upholsterer",
  "urban planner",
  "usher",
  "UX designer",
  "valve installer",
  "vending machine servicer",
  "veterinarian",
  "veterinary assistant",
  "veterinary technician",
  "vocational counselor",
  "vocational education teacher",
  "waiter",
  "waitress",
  "watch repairer",
  "water treatment plant operator",
  "weaving machine setter",
  "web development",
  "weigher",
  "welder",
  "wellhead pumper",
  "wholesale buyer",
  "wildlife biologist",
  "window trimmer",
  "wood patternmaker",
  "woodworker",
  "word processor",
  "writer",
  "yardmaster",
  "zoologist",
];

module.exports = jobFieldsData;