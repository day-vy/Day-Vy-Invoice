// Initialization script for catalog-only mode and header setup
// If coming from product-actions.html, enable catalog-only mode, open catalog, show header, and set user info
if (sessionStorage.getItem('catalogOnlyMode') === 'true') {
    window.catalogOnlyMode = true;
    sessionStorage.removeItem('catalogOnlyMode');
    // Set admin username and login time for display if not already set
    if (!sessionStorage.getItem('adminUser')) {
        sessionStorage.setItem('adminUser', 'Xing');
    }
    // Only set loginTime if not already set (preserve original login time)
    if (!sessionStorage.getItem('loginTime')) {
        sessionStorage.setItem('loginTime', new Date().toISOString());
    }
    window.addEventListener('DOMContentLoaded', function() {
        // Always show admin header when returning from product-actions
        var adminHeader = document.querySelector('.admin-header');
        if (adminHeader) adminHeader.style.display = '';
        // Set header text dynamically
        var adminUsername = document.getElementById('adminUsername');
        var loginTimeElem = document.getElementById('loginTime');
        var timerElem = document.getElementById('headerTimer');
        var adminName = sessionStorage.getItem('adminUser') || 'Admin';
        var loginTimeRaw = sessionStorage.getItem('loginTime');
        var loginTimeStr = '';
        if (loginTimeRaw) {
            var date = new Date(loginTimeRaw);
            loginTimeStr = 'Logged in: ' + date.toLocaleString();
        } else {
            loginTimeStr = '';
        }
        if (adminUsername) adminUsername.textContent = adminName;
        if (loginTimeElem) loginTimeElem.textContent = loginTimeStr;
        // Start live timer
        if (timerElem) {
            function updateTimer() {
                var now = new Date();
                timerElem.textContent = '(' + now.toLocaleTimeString() + ')';
            }
            updateTimer();
            setInterval(updateTimer, 1000);
        }
        if (typeof toggleProductCatalog === 'function') {
            toggleProductCatalog();
        } else {
            setTimeout(function() {
                if (typeof toggleProductCatalog === 'function') toggleProductCatalog();
            }, 500);
        }
    });
} else {
    // Always start live timer on header load
    window.addEventListener('DOMContentLoaded', function() {
        var timerElem = document.getElementById('headerTimer');
        if (timerElem) {
            function updateTimer() {
                var now = new Date();
                timerElem.textContent = '(' + now.toLocaleTimeString() + ')';
            }
            updateTimer();
            setInterval(updateTimer, 1000);
        }
    });
}

// Open the combined Product Action Modal and show the specified tab (add, edit, delete)
function openProductActionModal(tab = 'add') {
    document.getElementById('productActionModal').style.display = 'block';
    showProductActionTab(tab);
}

// Show the correct tab in the Product Action Modal
function showProductActionTab(tab) {
    document.getElementById('tabContentAdd').style.display = 'none';
    document.getElementById('tabContentEdit').style.display = 'none';
    document.getElementById('tabContentDelete').style.display = 'none';
    document.getElementById('tabAddProduct').classList.remove('active');
    document.getElementById('tabEditProduct').classList.remove('active');
    document.getElementById('tabDeleteProduct').classList.remove('active');
    if (tab === 'add') {
        document.getElementById('tabContentAdd').style.display = 'block';
        document.getElementById('tabAddProduct').classList.add('active');
    } else if (tab === 'edit') {
        document.getElementById('tabContentEdit').style.display = 'block';
        document.getElementById('tabEditProduct').classList.add('active');
    } else if (tab === 'delete') {
        document.getElementById('tabContentDelete').style.display = 'block';
        document.getElementById('tabDeleteProduct').classList.add('active');
    }
}

// Close the Product Action Modal
function closeProductActionModal() {
    document.getElementById('productActionModal').style.display = 'none';
}
// Comprehensive product database organized by categories
const productDatabase = {
    "CeraVe": {
        products: [
            {
                name: "CeraVe Hydrating Facial Cleanser 237ml",
                defaultPrice: 15.00,
                image: "../image/CeraVe/CeraVe Hydrating Facial Cleanser 237ml.jpg"
            },
            {
                name: "CeraVe Hydrating Facial Cleanser 355ml",
                defaultPrice: 17.00,
                image: "../image/CeraVe/CeraVe Hydrating Facial Cleanser 355ml.webp"
            },
            {
                name: "CeraVe Hydrating Facial Cleanser 473ml",
                defaultPrice: 20.00,
                image: "../image/CeraVe/CeraVe Hydrating Facial Cleanser 473ml.jpg"
            },
            {
                name: "CeraVe Foaming Cleanser 236ml",
                defaultPrice: 15.00,
                image: "../image/CeraVe/CeraVe Hydrating Cream-to-Foam Cleanser 236ml.jpg"
            },
            {
                name: "CeraVe Foaming Cleanser 355ml",
                defaultPrice: 17.00,
                image: "../image/CeraVe/CeraVe Hydrating Cream-to-Foam Cleanser 355ml.jpg"
            },
            {
                name: "CeraVe Foaming Cleanser 473ml",
                defaultPrice: 20.00,
                image: "../image/CeraVe/CeraVe Hydrating Cream-to-Foam Cleanser 473ml.jpg"
            },
            {
                name: "CeraVe Cream to Foam Cleanser 237ml",
                defaultPrice: 15.00,
                image: "../image/CeraVe/CeraVe Foaming Facial Cleanser 237ml.png"
            },
            {
                name: "CeraVe Cream to Foam Cleanser 355ml",
                defaultPrice: 17.00,
                image: "../image/CeraVe/CeraVe Foaming Facial Cleanser 355ml.jpg",
            },
            {
                name: "CeraVe Cream to Foam Cleanser 473ml",
                defaultPrice: 20.00,
                image: "../image/CeraVe/CeraVe Foaming Facial Cleanser 474ml.jpg"
            },
            {
                name: "CeraVe Acne Control Cleanser 237ml",
                defaultPrice: 17.00,
                image: "../image/CeraVe/CeraVe Acne Control Cleanser 236ml.jpg"
            },
            {
                name: "CeraVe Acne Control Cleanser 355ml",
                defaultPrice: 20.00,
                image: "../image/CeraVe/Cerave Acne Control Cleanser 355ml.jpg"
            },
            {
                name: "CeraVe Acne Control Cleanser 473ml",
                defaultPrice: 24.00,
                image: "../image/CeraVe/Cerave Acne Control Cleanser 473ml.jpg"
            },
            {
                name: "CeraVe Renewing SA Cleanser 237ml",
                defaultPrice: 17.00,
                image: "../image/CeraVe/CeraVe Renewing SA Cleanser 237ml.jpg"
            },
            {
                name: "CeraVe SA Cleanser 355ml",
                defaultPrice: 20.00,
                image: "../image/CeraVe/CeraVe Renewing SA Cleanser 355ml.png"
            },
            {
                name: "CeraVe Renewing SA Cleanser 473ml",
                defaultPrice: 22.00,
                image: "../image/CeraVe/CeraVe Renewing SA Cleanser 473ml.jpg"
            },
            {
                name: "CeraVe Acne Foaming Cream Cleanser 4%",
                defaultPrice: 18.00,
                image: "../image/CeraVe/CeraVe Acne Foaming Cream Cleanser 4%.jpg"
            },
            {
                name: "CeraVe Acne Foaming Cream Wash 10%",
                defaultPrice: 18.00,
                image: "../image/CeraVe/CeraVe Acne Foaming Cream Wash 10%.jpg"
            },
            {
                name: "CeraVe Vitamin C Serum",
                defaultPrice: 18.00,
                image: "../image/CeraVe/CeraVe Vitamin C Serum.jpg"
            },
            {
                name: "CeraVe Hyaluronic Acid Serum",
                defaultPrice: 18.00,
                image: "../image/CeraVe/CeraVe Hyaluronic Acid Serum.jpg"
            },
            {
                name: "CeraVe Resurfacing Retinol Serum",
                defaultPrice: 18.00,
                image: "../image/CeraVe/CeraVe Resurfacing Retinol Serum.jpg"
            },
            {
                name: "CeraVe Renewing Retinol Serum",
                defaultPrice: 18.00,
                image: "../image/CeraVe/CeraVe Renewing Retinol Serum.jpg"
            },
            {
                name: "CeraVe AM Facial Moisturizing Lotion SPf50",
                defaultPrice: 16.00,
                image: "../image/CeraVe/CeraVe AM Facial Moisturizing Lotion SPf50.jpg"
            },
            {
                name: "CeraVe PM Facial Moisturizing Lotion",
                defaultPrice: 16.00,
                image: "../image/CeraVe/CeraVe PM Facial Moisturizing Lotion.jpg"
            },
            {
                name: "CeraVe Moisturizing Lotion 236ml",
                defaultPrice: 15.00,
                image: "../image/CeraVe/CeraVe Moisturizing Lotion 236ml.jpg"
            },
            {
                name: "CeraVe Moisturizing Lotion 355ml",
                defaultPrice: 17.00,
                image: "../image/CeraVe/CeraVe Moisturizing Lotion 355ml.jpg"
            },
            {
                name: "CeraVe Moisturizing Lotion 473ml",
                defaultPrice: 20.00,
                image: "../image/CeraVe/CeraVe Moisturizing Lotion 473ml.jpg"
            },
            {
                name: "CeraVe Moisturizing Aloe Vera 237ml",
                defaultPrice: 16.00,
                image: ""
            },
            {
                name: "CeraVe Moisturizing Aloe Vera 355ml",
                defaultPrice: 18.00,
                image: ""
            },
            {
                name: "CeraVe Moisturizing Aloe Vera 473ml",
                defaultPrice: 21.00,
                image: ""
            },
            {
                name: "CeraVe Moisturizing Cream 236ml",
                defaultPrice: 16.00,
                image: "image/CeraVe/CeraVe Moisturizing Cream 236ml.jpg"
            },
            {
                name: "CeraVe Moisturizing Cream 340g",
                defaultPrice: 16.00,
                image: "image/CeraVe/CeraVe Moisturizing Cream 340g.jpg"
            },
            {
                name: "CeraVe Moisturizing Cream Set",
                defaultPrice: 36.00,
                image: ""
            },
            {
                name: "CeraVe SA Cream 340g",
                defaultPrice: 20.00,
                image: "image/CeraVe/CeraVe SA Cream 340g.jpg"
            },
            {
                name: "CeraVe SA Lotion 237ml",
                defaultPrice: 18.00,
                image: "image/CeraVe/CeraVe SA Lotion 237ml.jpg"
            },
            {
                name: "CeraVe Hydrating Mineral Sunscreen 75ml",
                defaultPrice: 16.00,
                image: "image/CeraVe/CeraVe Hydrating Mineral Sunscreen 75ml.jpg"
            },
            {
                name: "CeraVe Hydrating Toner 200ml",
                defaultPrice: 16.00,
                image: "image/CeraVe/CeraVe Hydrating Toner 200ml.jpg"
            },
            {
                name: "CeraVe Micellar Water 296ml",
                defaultPrice: 16.00,
                image: "image/CeraVe/CeraVe Micellar Water 296ml.jpg"
            },
            {
                name: "CeraVe Ultra Light Moisturizing Gel 52ml",
                defaultPrice: 18.00,
                image: "image/CeraVe/CeraVe Ultra Light Moisturizing Gel 52ml.jpg"
            },
            {
                name: "CeraVe Ultra Light Moisturizing Lotion SPF30",
                defaultPrice: 18.00,
                image: "image/CeraVe/CeraVe Ultra Light Moisturizing Lotion SPF30.jpg"
            },
            {
                name: "CeraVe Night Cream",
                defaultPrice: 18.00,
                image: "image/CeraVe/CeraVe Night Cream.jpg"
            },
            {
                name: "CeraVe Repair Eye Cream",
                defaultPrice: 15.00,
                image: "image/CeraVe/CeraVe Repair Eye Cream.jpg"
            },
            {
                name: "CeraVe Renewing Eye Cream",
                defaultPrice: 16.00,
                image: "image/CeraVe/CeraVe Renewing Eye Cream.jpg"
            },
            {
                name: "CeraVe Acne Control Gel",
                defaultPrice: 16.00,
                image: "image/CeraVe/CeraVe Acne Control Gel.jpg"
            }
        ]
    },
    "Differin Gel": {
        products: [
            {
                name: "Differin Gel 15g",
                defaultPrice: 16.00,
                image: ""
            },
            {
                name: "Differin Acne",
                defaultPrice: 16.00,
                image: ""
            },
            {
                name: "Differin Gel 45g",
                defaultPrice: 20.00, 
                image: "" 
            },
        ]
    },
    "Cetaphil": {
        products: [
            {
                name: "Cetaphil Gentle Skin Cleanser Set",
                defaultPrice: 30.00, image: "" 
            },
            {
                name: "Cetaphil Gentle Skin Cleanser 591ml",
                defaultPrice: 16.00, image: ""
            },
            { 
                name: "Cetaphil Gentle Skin Cleanser 473ml",
                defaultPrice: 16.00, image: "" 
            },
            {
                name: "cetaphil gentle skin cleanser 236ml",
                defaultPrice: 32.00, image: "" 
            },
            {
                name: "Cetaphil Gentle Skin Cleanser 125ml",
                defaultPrice: 9.00, image: "" 
            },
            {
                name: "Cetaphil Moisturizing Lotion Set",
                defaultPrice: 32.00, image: "" 
            },
            {
                name: "Cetaphil Moisturizing Cream Set",
                defaultPrice: 32.00, image: "" 
            },
            {
                name: "cetaphil gentle SA lotion 236ml",
                defaultPrice: 32.00, image: ""
            },
            {
                name: "cetaphil gentle SA cleanser 236ml",
                defaultPrice: 32.00, image: ""  
            },
            {
                name: "cetaphil gentle foaming cleanser 237ml",
                defaultPrice: 32.00, image: "" 
            },
            {
                name: "Cetaphil Daily Facial Cleanser 473ml",
                defaultPrice: 18.00, image: ""
            },
            {   
                name: "cetaphil Daily facial cleanser 236ml",
                defaultPrice: 32.00, image: ""  
            },
            {
                name: "Cetaphil Derma Control 237ml",
                defaultPrice: 14.00, image: "" 
            },
            {
                name: "Cetaphil Oil Removing Foam Wash 237ml",
                defaultPrice: 14.00, image: "" 
            },
            {
                name: "Cetaphil Baby Lotion Set",
                defaultPrice: 26.00, image: "" 
            },
            {
                name: "cetaphil gentle cleansing bar",
                defaultPrice: 26.00, image: "" 
            },
            {
                name: "cetaphil pore clearing acne cleanser",
                defaultPrice: 26.00, image: "" 
            },
            {
                name: "cetaphil repairing post acne serum",
                defaultPrice: 26.00, image: "" 
            },
            {
                name: "Cetaphil Daily Oil Free",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Cetaphil PM lotion",
                defaultPrice: 16.00, image: "" 
            },
            {
                name: "Cetaphil Daily Facial Moisturizer SPf35",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Cetaphil Daily Facial Moisturizer SPf15",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Cetaphil Daily Facial Moisturizer SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "cetaphil rich hydrating cream",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "cetaphil sheer mineral sunscreen",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "cetaphil complexion clearing acne cleanser",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "cetaphil gentle acne moisturizer",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "cetaphil extra gentle scrub 178ml",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "cetaphil hydrating foaming cleanser  473ml",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "cetaphil redness night moisturizer",
                defaultPrice: 17.00, image: ""
            },
            {
                name: "cetaphil hydrating firming cream 96g",
                defaultPrice: 18.00, image: "" 
            },
            {    
                name: "cetaphil Ceramide serum",
                defaultPrice: 32.00, image: "" 
            },
            {    
                name: "cetaphil vitamin C serum",
                defaultPrice: 32.00, image: ""
            },
            {    
                name: "cetaphil Healthy radian serum",
                defaultPrice: 32.00, image: ""
            },
            {    
                name: "cetaphil healthy radiance day cream spf 30",
                defaultPrice: 32.00, image: ""
            },
            {    
                name: "cetaphil healthy radiance renewing cream",
                defaultPrice: 32.00, image: ""
            }
        ]
    },
    "LA ROCHE-POSAY": {
        products: [
            {
                name: "LA ROCHE Foaming Gel Cleanser M+ 400ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Foaming Gel Cleanser M+ 200ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Foaming Gel Cleanser M+ 50ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Purifying Foaming Cleanser 400ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Gentle Foaming Wash 400ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Hydrating Gentle Wash 400ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Hydrating Gentle Cleanser 200ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Purifying Foaming Cleanser 200ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Effaclar Gel Cleanser 200ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Cicaplast Gel B5",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Dou M+ 40ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Eau Micellaire 400ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Effaclar Toner 200ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Lotion Aqaisante 200ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Toleriance Dermo Cleanser 200ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Double Repair Moisturizer",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Double Repair Matte Moisturizer",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Double Repair SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Cicaplast B5+ 40ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Cicaplast B5+ 100ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Dou M+ 15ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Mat+",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Effaclar Clarifying Solution 200ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Fluide Invisible SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Fluide Teinte SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Fluide Oil Control SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {    
                name: "LA ROCHE anti dark spot fluid spf 50",
                defaultPrice: 32.00, image: ""
            },
            {
                name: "LA ROCHE Fluide Invisible Baby SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Oil Control SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Cream Hydrating SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Photocorrection SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Spray Antishine SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Invisible Spray SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Thermale Spray 300ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Thermale Spray 150ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Thermale Spray 50ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Vitamin c10 Serum 30ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Hyalu B5 Serum 30ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Retionl B3 Serum 30ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Effaclar Serum 30ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Mela B3 Serum",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Cleansing Oil 400ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Moisturizing Lotion 400ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Triple Moisturizing Cream 400ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Acne Set",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE Lait Hydrant SPf50 250ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "LA ROCHE B5+ SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Advanced Clinical Vitamin C Serum",
                defaultPrice: 20.00, image: "" 
            },
            {
                name: "Advanced Clinical Vitamin C Cream",
                defaultPrice: 18.00, image: "" 
            },
            {
                name: "The Ordinary Peeling serum",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "The Ordinary Niacinamide serum",
                defaultPrice: 10.00, image: "" 
            }
        ]
    },
    "Avene-Evian": {
        products: [
            {
                name: "Avene SPf50 Antiblemish",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Avene Invisible Touch",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Avene Ultra Light",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Avene Thermale Spray 300ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Avene Thermale Spray 150ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Avene Thermale Spray 50ML",
                defaultPrice: 17.00, image: "" 
            },
            {    
                name: "Evian facial spray 300ml",
                defaultPrice: 32.00, image: "" 
            },
            {    
                name: "Evian facial spray 150ml",
                defaultPrice: 32.00, image: "" 
            },
            {    
                name: "Evian facial spray 50ml",
                defaultPrice: 32.00, image: "" 
            }
        ]
    },
    "Vichy": {
        products: [
            {
                name: "Vichy Thermal Spa Water 300ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Vichy Thermal Spa Water 150ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Vichy Mineral Serum 30ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Vichy Mineral Serum 50ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Vichy Mattifying SPF50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Vichy Anti-Ageing 3 in 1 SPF50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Vichy Anti Dark Spot SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Vichy B3 Serum",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Vichy Capital Soleil SPf50",
                defaultPrice: 17.00, image: "" 
            }
        ]
    },
    "Eucerin-Woolworth": {
        products: [
            {
                name: "Eucerin Pigment Control SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Eucerin Oil Control SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Eucerin Hydro Protect SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Eucerin Sensitive Protect SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Eucerin Hydperpigmentation Serum",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "WoolWorth Sunscreen 1000ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "WoolWorth Sunscreen 500ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "WoolWorth Sunscreen 150ML",
                defaultPrice: 17.00, image: "" 
            }
        ]
    },
    "Bioderma": {
        products: [
            {
                name: "Bioderma Photoderm Spray SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Bioderma Aquafluide invisibble SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Bioderma Aquafluide Golden SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "bioderma crème SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Bioderma Akn Mat SPf30",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Bioderma Micellaire Water 500ml",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Bioderma Micellaire Water 50ml",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Bioderma Crealin Cleanser 500ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Bioderma Crealin Cleanser 200ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Bioderma Sebium Cleanser 500ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Bioderma Sebium Cleanser 200ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Bioderma Pigmentbio 75ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Bioderma Pore Refiner Cream 30ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Bioderma Hydrebio Micellaire",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Bioderma Spot Age SPf50",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Bioderma Pediatric late SPf50 200ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "SVR Sebia Clear Cleanser 400ML",
                defaultPrice: 17.00, image: "" 
            }
        ]
    },
    "Palmer": {
        products: [
            {
                name: "Palmer Q10",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Palmer Skin Therapy Oil",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Palmer Stretch Mark Butter",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Palmer Sretch Mark Lotion 250ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Palmer Stretch Mark Lotion 315ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Palmer Set Pregnancy",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Palmer Soothing Oil",
                defaultPrice: 17.00, image: "" 
            }
        ]
    },
    "OGX": {
        products: [
            {
                name: "OGX Shampoo / Conditioner 385ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "OGX Shampoo / Conditioner 577ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "OGX Shampoo / Conditioner 750ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "OGX Penetrating Argan Oil",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "OGX scrub 577ML",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Nizoral Anti-Dandruff",
                defaultPrice: 17.00, image: "" 
            }
        ]
    },
    "Selsun": {
        products: [
            {
                name: "Selsun Red",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Selsun Purple",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Selsun Yellow",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Selsun Blue",
                defaultPrice: 17.00, image: "" 
            }
        ]
    },
    "Degree-Gillette": {
        products: [
            {
                name: "Degree Black Men",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Degree Women",
                defaultPrice: 20.00, image: "" 
            },
            {
                name: "Degree Original",
                defaultPrice: 18.00, image: "" 
            },
            {
                name: "Gillette Ultimate 6 in 1",
                defaultPrice: 10.00, image: ""  
            }
        ]
    },
    "Elizabeth": {
        products: [
            {
                name: "Elizabeth Red Door",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Elizabeth Green Tea",
                defaultPrice: 8.00, image: "" 
            }
        ]
    },
    "Secret": {
        products: [
            {
                name: "Secret Ph Gel",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "Secret Gel",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "Secret Gel Ocean Breeze",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "Secret Gel Lavender",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "Secret Gel Completely Clean",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "Secret Gel Unscented",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "Secret Gel Protecting Powder",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "Secret Clinical Strength Soft Set",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "secret clinical strength solid",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Secret Clinical Strength 45g",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Secret Clinial Strength 73g",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "Secret Deodorant Spray",
                defaultPrice: 7.00, image: "" 
            }
        ]
    },
    "Old Spice": {
        products: [
            {
                name: "Old Spice Pure Sport Set",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Old Spice Swagger Set",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Old Spice Deodorant 73g",
                defaultPrice: 6.00, image: "" 
            },
            {
                name: "Old Spice Deodorant 85g",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "Old Spice Body Wash",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "Old Spice Shampoo Conditioner 2in1",
                defaultPrice: 7.00, image: "" 
            }
        ]
    },
    "Essential": {
        products: [
            {
                name: "Essential Deodorant",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Essential Lemon",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Essential Lavender",
                defaultPrice: 6.00, image: "" 
            },
            {
                name: "Essential Berry",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "Essential Charcoal",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "Essential Unscented",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "Arm Hammer Ultra Active Sport",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Arm Hammer Ultra Fresh",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Arm  Hammer UltraUnscented",
                defaultPrice: 7.00, image: "" 
            }
        ]
    },
    "Etiaxil": {
        products: [
            {
                name: "Etiaxil Protection 48h",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Etiaxil Sensitive",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Etiaxil Extreme",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Etiaxil Spray",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Etiaxil Original",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Etiaxil Men",
                defaultPrice: 15.00, image: "" 
            }
        ]
    },
    "Gold Bond": {
        products: [
            {
                name: "Gold Bond Retinol Overnight",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Gold Bond Body Bright",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Gold Bond Neck and Chest",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Gold Bond Deep Moisturizer",
                defaultPrice: 10.00, image: "" 
            }
        ]
    },
    "Dove": {
        products: [
            {
                name: "Dove Body Wash Men",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Scrub 298g",
                defaultPrice: 9.00, image: "" 
            },
            {
                name: "Dove 298g Crushed Cherries",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove 298g Brown Sugar",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove 298g Rice Milk",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove scrub 450g",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove 450g pomegranate",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Dove 450g Brown Sugar",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove 450g Rose",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove 450g Vanilla Cherries",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove 450g Crushed Cherries",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Scrub Body Love Night scrub",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Scrub Body Love Exofoliate scrub",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Body Love Wash",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Deodorant cucumber Set",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Deodorant Set",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Deodorant 0%",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Body Wash Hydration 6%",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Body Wash Vitality",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Body Wash Acne Clear",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Body Wash Soothing",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Body Wash Set For Kid",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Vitamin Care Coconut",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Vitamin Care Cucumber",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Vitamin Care Raspberry",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Vitamin Care Lavender",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Dove Vitamin Care Deodorant",
                defaultPrice: 8.00, image: "" 
            }
        ]
    },
    "ST. Ives": {
        products: [
            {
                name: "St.Ives Body wash",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "St.Ives Facial cleanser",
                defaultPrice: 6.00, image: "" 
            },
            {
                name: "St.Ives body lotion",
                defaultPrice: 6.00, image: "" 
            },
            {
                name: "st.ives body wash",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "st.ives collagen",
                defaultPrice: 17.00, image: ""  
            }
        ]
    },
    "Olay": {
        products: [
            {
                name: "Olay Niacinamide Cream",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Olay Vitamin C Cream",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Olay Retinol Cream",
                defaultPrice: 16.00, image: "" 
            },
            {
                name: "Olay 7 in 1 cream",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay 7 in 1 moisturizer sunscreen",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay 7 in 1 day and night moisturizer",
                defaultPrice: 17.00, image: ""   
            },
            {
                name: "Olay Super Serum 5 in 1",
                defaultPrice: 20.00, image: "" 
            },
            {
                name: "Olay niacinamide max serum",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay retinol max serum",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay vitamin C serum",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay whip cream",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay super cream",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay collagen moisturizing cream",
                defaultPrice: 17.00, image: ""
            },
            {
                name: "Olay body wash hyaluronic acid 530ml",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay body wash retinol 530ml",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay body wash niacincinamide 530ml",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay body wash collagen 530ml",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay body wash sugar butter 530ml",
                defaultPrice: 17.00, image: ""      
            },
            {
                name: "Olay fresh radiance Body Wash 975ml",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Olay body wash ultra moisture 975ml",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay body wash essential botanical 700ml",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay niacinamide body lotion",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay collagen body lotion",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay retinol body lotion",
                defaultPrice: 17.00, image: ""
            },
            {
                name: "Olay vitamin c body lotion",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Olay ribbon body wash",
                defaultPrice: 17.00, image: ""
            },
            {
                name: "Olay 7 in 1 foaming body wash",
                defaultPrice: 17.00, image: ""   
            },
        ]
    },
    "Bath Body Work": {
        products: [
            {
                name: "Bath body work body lotion",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Bath body work body wash",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Bath body work set",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Bath body work fragrance mist 236ml ",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Bath body work hand gel 28ml",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Bath body work hand cream 70g",
                defaultPrice: 12.00, image: ""  
            }
        ]
    },
    "Victoria Secret": {
        products: [
            {
                name: "Victoria Secret shimmer perfume",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Victoria Secret non shimer perfume",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Victoria Secret body lotion",
                defaultPrice: 12.00, image: "" 
            },
        ]
    },
    "Aroma": {
        products: [
            {
                name: "Aroma Lotion Rose and Vanilla",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Aroma Lotion Pine",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Aroma Lotion Stress Relief",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Aroma Lotion Relaxing Midnight",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Aroma Lotion Boost",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Aroma Lotion Orange",
                defaultPrice: 12.00, image: "" 
            }
        ]
    },
    "Batiste": {
        products: [
            {
                name: "Batiste Dry Bare",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Batiste Dry Original",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Batiste Dry Tropical",
                defaultPrice: 10.00, image: ""
            },
            {
                name: "Batiste Dry Cherry",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Batiste Dry Rose Gold",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Batiste Dry Blush",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Batiste Dry Oriental",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Batiste Dry Fresh",
                defaultPrice: 12.00, image: "" 
            }
        ]
    },
    "Tooth Paste": {
        products: [
            {
                name: "Crest Brilliance Set",
                defaultPrice: 25.00, image: "" 
            },
            {
                name: "Crest Brilliance Charcoal",
                defaultPrice: 8.00, image: ""
            },
            {
                name: "Crest Brilliance Blast",
                defaultPrice: 8.00, image: ""
            },
            {
                name: "Crest Brilliance Peppermint",
                defaultPrice: 8.00, image: ""
            },
            {
                name: "Sensodyne Advanced White Set",
                defaultPrice: 20.00, image: "" 
            },
            {
                name: "Sensodyne Advanced White",
                defaultPrice: 20.00, image: "" 
            },
            {
                name: "Crest 3D White Set",
                defaultPrice: 18.00, image: "" 
            },
            {
                name: "Colgate Max Fresh Set",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Colgate Total Set",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "TheraBreath Mouthwash",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "TheraBreath Anti-Cavity Pink",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "TheraBreath Healthy Gum Blue",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "TheraBreath Fresh Breath Green",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "TheraBreath Fresh Breath Blue",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "TheraBreath Dazzling Silver",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Marvis toothpaste",
                defaultPrice: 17.00, image: "" 
            },
            {
                name: "Arm Hammer Complete Care",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "Arm Hammer Advance White",
                defaultPrice: 7.00, image: "" 
            },
            {
                name: "Arm Hammer PeroxiCare",
                defaultPrice: 7.00, image: "" 
            }

        ]
    },
    "Vaseline": {
        products: [
            {
                name: "Vaseline Lip Balm Cherry",
                defaultPrice: 3.00, image: "" 
            },
            {
                name: "Vaseline Lip Balm Original",
                defaultPrice: 3.00, image: "" 
            },
            {
                name: "Vaseline Lip Balm Rosy",
                defaultPrice: 3.00, image: "" 
            },
            {
                name: "Vaseline Lip Balm Aloe Vera",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Vaseline Lip Balm",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Vaseline Healing Jelly 368g",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Vaseline Healing Jelly Baby 368g",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Vaseline Healing Jelly 250g",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Vaseline USA Lotion 725ml",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Vaseline Cocoa Oil",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Vaseline Jelly Original",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Vaseline Jelly Small Rosy Lip",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Vaseline Jelly Small Coca",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Vaseline Jelly Small",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Vaseline lotion serum Pro vita B3",
                defaultPrice: 17.00, image: "" 
            }
        ]
    },
    "Lip Balm": {
        products: [
            {
                name: "Vaseline Lip Balm Cherry",
                defaultPrice: 3.00, image: "" 
            },
            {
                name: "Vaseline Lip Balm Original",
                defaultPrice: 3.00, image: "" 
            },
            {
                name: "Vaseline Lip Balm Rosy",
                defaultPrice: 3.00, image: "" 
            },
            {
                name: "Vaseline Lip Balm Aloe Vera",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Vaseline Lip Balm",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Carmex Original Lip Balm",
                defaultPrice: 4.00, image: "" 
            },
            {
                name: "Carmex Lip Balm Flavor",
                defaultPrice: 4.00, image: "" 
            },
            {
                name: "ChapStick Classic Cherry",
                defaultPrice: 3.00, image: "" 
            },
            {
                name: "ChapStick Classic Original",
                defaultPrice: 3.00, image: "" 
            },
            {
                name: "ChapStick Moisturizer",
                defaultPrice: 4.00, image: "" 
            }
        ]
    },
    "Intimate Wash": {
        products: [
            {
                name: "Vagisil Intimate Wash",
                defaultPrice: 8.00, image: "" 
            },
            {
                name: "Vagisil Wash Peach Blossom",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Vagisil Odor Block",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "vagisil Wash Roe",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Vagisil Wash Jasmine",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Femfresh Daily Wash",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Femfresh Sensitive Wash",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Femfresh Doedorising Active Wash",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Femfresh Intimate Wash",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Summereve Intimate Wash",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Summereve Simple Sensitive",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Summereve Amber Night",
                defaultPrice: 12.00, image: "" 
            },
            {
                name: "Summereve Island Splash",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Summereve Blissful Escape",
                defaultPrice: 12.00, image: "" 
            }
        ]
    },
    "Cotton Pad": {
        products: [
            {
                name: "Le Soin Pur Cotton 600",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Olea Cotton Pad",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Aura Cotton Pad",
                defaultPrice: 5.00, image: "" 
            }
        ]
    },
    "Neutrogena": {
        products: [
            {
                name: "Neutrogena Ultra Cream To Foam",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Neutrogena Beach Defense Spray",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Neutrogena Ultra Sheer SPf60",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Neutrogena Ultra Sheer SPf55",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Neutrogena Body Oil",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Neutrogena Hydroboost Water Gel",
                defaultPrice: 15.00, image: "" 
            },
            {
                name: "Neutrogena Hydroboost Water Cream",
                defaultPrice: 15.00, image: "" 
            }
        ]
    },
    "RoC": {
        products: [
            {
                name: "RoC Daily Serum Vitamin C",
                defaultPrice: 22.00, image: "" 
            },
            {
                name: "RoC Hyaluronic Serum",
                defaultPrice: 22.00, image: "" 
            },
            {
                name: "RoC Advanced Retinol Cream",
                defaultPrice: 25.00, image: "" 
            }
        ]
    },
    "Hair Serum": {
        products: [
            {
                name: "Kirkland Minoxidil 5%",
                defaultPrice: 22.00, image: "" 
            },
            {
                name: "Keratase Hair Serum",
                defaultPrice: 22.00, image: "" 
            },
            {
                name: "Baileul Minoxidil 2%",
                defaultPrice: 22.00, image: "" 
            },
            {
                name: "Baileul Minoxidil 5%",
                defaultPrice: 22.00, image: "" 
            },
            {
                name: "Meille Oil",
                defaultPrice: 22.00, image: "" 
            },
            {
                name: "Meille Oil Light",
                defaultPrice: 22.00, image: "" 
            },
            {
                name: "Meille Shampoo / Conditioner",
                defaultPrice: 25.00, image: "" 
            }
        ]
    },
    "L'Oreal": {
        products: [
            {
                name: "LOreal Collagen Moisturizer",
                defaultPrice: 14.00, image: "" 
            },
            {
                name: "LOreal Eye Serum Caffeine",
                defaultPrice: 12.00, image: "" 
            }
        ]
    },
    "Body Wash": {
        products: [
            {
                name: "Suave 3 in 1 Kid",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Suave 3 in 1 Watermelon Kid",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Suave 3 in 1 apple Kid",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Irish Spring Original 946ml",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Irish Spring Ice 532ML",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Irish Spring Soap Bar",
                defaultPrice: 10.00, image: "" 
            }
        ]
    },
    "Kpem-Loccitance": {
        products: [
            {
                name: "Kpem Hand Cream",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Kpem Foot Cream",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Kpem Vein Cream",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Loccitance Hand Cream",
                defaultPrice: 10.00, image: "" 
            }
        ]
    },
    "Aveeno-Redwin": {
        products: [
            {
                name: "Aveeno Kid Face Body Lotion",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Aveeno Kid Face And Body Wash",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Aveeno Moisturizing Lotion Set",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Aveeno Body Wash Set",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Redwin Vitamin E Serum",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Redwin Vitamin E Serum",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Evoderm Bebe Shower Gel",
                defaultPrice: 10.00, image: "" 
            }
        ]
    },
    "Mask": {
        products: [
            {
                name: "Max Clinic Melatonin Mask Set",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "JM panthelene mask",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "JM prime gold mask",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Ninetalk hydrogel mask",
                defaultPrice: 10.00, image: "" 
            }
        ]
    },
    "Diverse": {
        products: [
            {
                name: "Treehut Scrub",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Panoxyl Acne Foaming 10%",
                defaultPrice: 10.00, image: "" 
            },
            {
                name: "Panoxyl Acne Foaming 4%",
                defaultPrice: 10.00, image: ""
            },
            {
                name: "Melatonin 5% Cream",
                defaultPrice: 15.00, image: "" 
            }
        ]
    }
};

// Global invoice data object
let invoiceData = {
    items: [],
    deliveryFee: 2.00
};

// Make invoiceData globally accessible
window.invoiceData = invoiceData;

// Load productDatabase from localStorage if available
function loadProductDatabaseFromStorage() {
    try {
        const savedDatabase = localStorage.getItem('productDatabase');
        if (savedDatabase) {
            const parsedDatabase = JSON.parse(savedDatabase);
            // Merge with existing productDatabase to preserve any new additions
            Object.keys(parsedDatabase).forEach(brand => {
                if (!productDatabase[brand]) {
                    productDatabase[brand] = { products: [] };
                }
                // Update existing products and add new ones
                parsedDatabase[brand].products.forEach(savedProduct => {
                    const existingIndex = productDatabase[brand].products.findIndex(p => p.name === savedProduct.name);
                    if (existingIndex !== -1) {
                        // Update existing product
                        Object.assign(productDatabase[brand].products[existingIndex], savedProduct);
                    } else {
                        // Add new product
                        productDatabase[brand].products.push(savedProduct);
                    }
                });
            });
            console.log('📦 Product database loaded from localStorage');
        }
    } catch (error) {
        console.warn('⚠️ Failed to load product database from localStorage:', error);
    }
}

// Load saved data on initialization
loadProductDatabaseFromStorage();

// Convert new database structure to be compatible with existing code
const productCatalog = {};
Object.keys(productDatabase).forEach(category => {
    productCatalog[category] = productDatabase[category].products.map(product => ({
        name: product.name,
        price: product.defaultPrice,
        image: product.image,
        id: product.id
    }));
});

// Render catalog products organized by brand with beautiful design
function renderCatalogProducts(filter = '') {
    const list = document.getElementById('productCatalogList');
    if (!list) return;
    
    const query = filter.trim().toLowerCase();
    let html = '';
    let totalDisplayed = 0;
    let matchingProducts = 0;
    
    // If there's a search query, show only matching products
    if (query !== '') {
        // Search mode - show only matching products
        Object.keys(productCatalog).forEach(brand => {
            const products = productCatalog[brand];
            const matchingProductsInBrand = products.filter(product => 
                product.name.toLowerCase().includes(query) || 
                brand.toLowerCase().includes(query)
            );
            
            if (matchingProductsInBrand.length > 0) {
                html += `
                <div style="margin-bottom: 2rem;">
                    <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1rem; border-radius: 10px 10px 0 0; font-weight: bold; font-size: 1.2rem; text-shadow: 0 1px 3px rgba(0,0,0,0.3);">
                        🏷️ ${brand} <span style="font-size: 0.9rem; opacity: 0.8;">(${matchingProductsInBrand.length} matching)</span>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; padding: 1rem; background: white; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">`;
                
                matchingProductsInBrand.forEach((product, productIndex) => {
                    html += `
                        <div class="product-card" style="background: linear-gradient(135deg, #fff3cd, #ffeaa7); border: 2px solid #f39c12; border-radius: 16px; padding: 1.5rem; box-shadow: 0 8px 25px rgba(0,0,0,0.1); transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); cursor: pointer; position: relative; overflow: hidden; animation-delay: ${productIndex * 0.1}s;" 
                             onmouseover="this.style.transform='translateY(-8px) scale(1.02)'; this.style.boxShadow='0 15px 35px rgba(0,0,0,0.2)'; this.style.borderColor='#e67e22'" 
                             onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.1)'; this.style.borderColor='#f39c12'">
                            
                            <!-- Product Image with Enhanced Styling -->
                            <div style="width: 100%; height: 180px; margin-bottom: 1.25rem; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #f8f9fa, #e9ecef); display: flex; align-items: center; justify-content: center; position: relative; box-shadow: inset 0 2px 8px rgba(0,0,0,0.1);">
                                <img src="${product.image}" alt="${product.name}" 
                                     style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;"
                                     onmouseover="this.style.transform='scale(1.1) rotate(1deg)'"
                                     onmouseout="this.style.transform='scale(1) rotate(0deg)'"
                                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                                <div style="display: none; width: 100%; height: 100%; background: linear-gradient(135deg, #667eea, #764ba2); align-items: center; justify-content: center; color: white; font-size: 2.5rem; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                                    ${product.name.charAt(0)}
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 1.25rem;">
                                <div style="font-weight: bold; color: #2c3e50; font-size: 1.2rem; margin-bottom: 0.5rem; line-height: 1.3;">${product.name}</div>
                                <div style="color: #7f8c8d; font-size: 0.95rem; font-weight: 500;">📦 ${brand}</div>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div style="font-size: 1.6rem; font-weight: 900; color: #27ae60; text-shadow: 0 1px 3px rgba(39, 174, 96, 0.3);">$${product.price.toFixed(2)}</div>
                                <button onclick="addCatalogProduct('${product.name.replace(/'/g, "\\'")}', 1, ${product.price}, event)" 
                                        style="background: linear-gradient(135deg, #00b894, #00cec9); color: white; border: none; padding: 0.875rem 1.75rem; border-radius: 25px; font-weight: bold; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,184,148,0.3); font-size: 0.95rem;"
                                        onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 6px 20px rgba(0,184,148,0.4)'; this.style.background='linear-gradient(135deg, #00a085, #00b7a8)'"
                                        onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 15px rgba(0,184,148,0.3)'; this.style.background='linear-gradient(135deg, #00b894, #00cec9)'">
                                    ➕ Add to Invoice
                                </button>
                            </div>
                            <div style="display: flex; gap: 0.5rem; margin-top: 1rem; justify-content: center;">
                                <button onclick="openSystemProductForm('edit', '${brand}', '${product.name.replace(/'/g, "\\'")}', ${product.price})" 
                                        style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.3s ease; font-size: 0.9rem;"
                                        onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 15px rgba(37, 99, 235, 0.4)'"
                                        onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
                                    ✏️ Edit
                                </button>
                                <button onclick="openSystemProductForm('delete', '${brand}', '${product.name.replace(/'/g, "\\'")}', ${product.price})" 
                                        style="background: linear-gradient(135deg, #ef4444, #b91c1c); color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.3s ease; font-size: 0.9rem;"
                                        onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 15px rgba(239, 68, 68, 0.4)'"
                                        onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>`;
                    matchingProducts++;
                });
                
                html += `</div></div>`;
            }
        });
        
        if (matchingProducts === 0) {
            html = `<div style="text-align: center; padding: 3rem; color: #7f8c8d;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                        <div style="font-size: 1.2rem; font-weight: bold;">No products found</div>
                        <div>Try searching for a different product or brand</div>
                    </div>`;
        } else {
            const summaryHtml = `<div style="background: linear-gradient(135deg, #00b894, #00cec9); color: white; padding: 1rem; border-radius: 10px; margin-bottom: 1.5rem; text-align: center; font-weight: bold; box-shadow: 0 4px 15px rgba(0,184,148,0.3);">
                🔍 Found ${matchingProducts} products matching "${query}"
            </div>`;
            html = summaryHtml + html;
        }
    } else {
        // No search - show all brands and products organized by brand
        Object.keys(productCatalog).forEach(brand => {
            const products = productCatalog[brand];
            
            html += `
            <div style="margin-bottom: 2rem;">
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1rem; border-radius: 10px 10px 0 0; font-weight: bold; font-size: 1.2rem; text-shadow: 0 1px 3px rgba(0,0,0,0.3);">
                    🏷️ ${brand} <span style="font-size: 0.9rem; opacity: 0.8;">(${products.length} products)</span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; padding: 1rem; background: white; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">`;
            
            products.forEach((product, productIndex) => {
                html += `
                    <div class="product-card" style="background: linear-gradient(135deg, #ffffff, #f8f9fa); border: 2px solid #e9ecef; border-radius: 16px; padding: 1.5rem; box-shadow: 0 8px 25px rgba(0,0,0,0.1); transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); cursor: pointer; position: relative; overflow: hidden; animation-delay: ${(totalDisplayed + productIndex) * 0.05}s;">
                        <!-- Product Image with Enhanced Styling -->
                        <div style="width: 100%; height: 180px; margin-bottom: 1.25rem; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #f8f9fa, #e9ecef); display: flex; align-items: center; justify-content: center; position: relative; box-shadow: inset 0 2px 8px rgba(0,0,0,0.1);">
                            <img src="${product.image}" alt="${product.name}" 
                                 style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;"
                                 onmouseover="this.style.transform='scale(1.1) rotate(1deg)'"
                                 onmouseout="this.style.transform='scale(1) rotate(0deg)'"
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                            <div style="display: none; width: 100%; height: 100%; background: linear-gradient(135deg, #667eea, #764ba2); align-items: center; justify-content: center; color: white; font-size: 2.5rem; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                                ${product.name.charAt(0)}
                            </div>
                        </div>
                        <div style="margin-bottom: 1.25rem;">
                            <div style="font-weight: bold; color: #2c3e50; font-size: 1.2rem; margin-bottom: 0.5rem; line-height: 1.3;">${product.name}</div>
                            <div style="color: #7f8c8d; font-size: 0.95rem; font-weight: 500;">📦 ${brand}</div>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;">
                            <div style="font-size: 1.6rem; font-weight: 900; color: #27ae60; text-shadow: 0 1px 3px rgba(39, 174, 96, 0.3);">$${product.price.toFixed(2)}</div>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; margin-top: 1rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <label for="qty_${brand}_${productIndex}" style="font-size: 0.95rem; color: #374151;">Qty:</label>
                                <input type="number" id="qty_${brand}_${productIndex}" min="1" value="1" style="width: 60px; padding: 0.2rem 0.5rem; border-radius: 6px; border: 1px solid #d1d5db; font-size: 1rem;">
                            </div>
                            <div style="display: flex; gap: 0.5rem;">
                                <button onclick="addCatalogProduct('${product.name.replace(/'/g, "\\'")}', document.getElementById('qty_${brand}_${productIndex}').value, ${product.price}, event)" style="background: #22c55e; color: #fff; border: none; border-radius: 8px; padding: 0.5rem 1.2rem; font-size: 1rem; font-weight: 600; cursor: pointer;">Add</button>
                                <button onclick="openSystemProductForm('edit', '${brand}', '${product.name.replace(/'/g, "\\'")}', ${product.price})" style="background: #2563eb; color: #fff; border: none; border-radius: 8px; padding: 0.5rem 1.2rem; font-size: 1rem; font-weight: 600; cursor: pointer;">Edit</button>
                                <button onclick="openSystemProductForm('delete', '${brand}', '${product.name.replace(/'/g, "\\'")}', ${product.price})" style="background: #ef4444; color: #fff; border: none; border-radius: 8px; padding: 0.5rem 1.2rem; font-size: 1rem; font-weight: 600; cursor: pointer;">Delete</button>
                            </div>
                        </div>
                    </div>`;
                totalDisplayed++;
            });
            
            html += `</div></div>`;
        });
        
    }
    
    list.innerHTML = html;
}

// Filter catalog products by search input
function filterCatalogProducts() {
    const input = document.getElementById('catalogSearchInput');
    renderCatalogProducts(input ? input.value : '');
}

// Initialize catalog sidebar
function initializeCatalogSidebar() {
    const brandList = document.getElementById('brandFilterList');
    if (!brandList) return;
    
    // Generate brand filter buttons with enhanced styling
    let brandHTML = '';
    const brands = Object.keys(productCatalog);
    brands.forEach((brand, index) => {
        const productCount = productCatalog[brand].length;
        brandHTML += `
            <button onclick="filterByBrand('${brand}')" 
                    class="brand-filter-btn"
                    style="width: 100%; text-align: left; background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 0.875rem 1rem; border-radius: 10px; margin-bottom: 0.5rem; cursor: pointer; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); font-size: 0.95rem; font-weight: 500; position: relative; overflow: hidden; animation-delay: ${index * 0.1}s;"
                    onmouseover="this.style.background='rgba(255,255,255,0.25)'; this.style.transform='translateX(5px)'; this.style.borderColor='rgba(255,255,255,0.4)'"
                    onmouseout="this.style.background='rgba(255,255,255,0.15)'; this.style.transform='translateX(0)'; this.style.borderColor='rgba(255,255,255,0.2)'">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>🏷️ ${brand}</span>
                    <span style="background: rgba(255,255,255,0.2); padding: 0.25rem 0.5rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">${productCount}</span>
                </div>
            </button>
        `;
    });
    brandList.innerHTML = brandHTML;
    // Show brand count
    const brandCountSpan = document.getElementById('brandCount');
    if (brandCountSpan) {
        brandCountSpan.textContent = `(${brands.length})`;
    }
    
    // Update total product count with animation
    const totalCount = Object.values(productCatalog).reduce((sum, products) => sum + products.length, 0);
    const totalElement = document.getElementById('totalProductCount');
    if (totalElement) {
        // Animate count up
        let currentCount = 0;
        const increment = Math.ceil(totalCount / 30);
        const countAnimation = setInterval(() => {
            currentCount += increment;
            if (currentCount >= totalCount) {
                currentCount = totalCount;
                clearInterval(countAnimation);
            }
            totalElement.textContent = currentCount;
        }, 50);
    }
}

// Filter products by brand
function filterByBrand(brand) {
    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) {
        searchInput.value = brand;
        filterCatalogProducts();
    }
}

// Show all catalog products
function showAllCatalogProducts() {
    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) {
        searchInput.value = '';
        renderCatalogProducts();
    }
}

// Clear catalog search
function clearCatalogSearch() {
    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) {
        searchInput.value = '';
        renderCatalogProducts();
        searchInput.focus();
    }
}

// Add product from catalog to invoice

// Add product from catalog to invoice
function addCatalogProduct(name, quantity, price, event) {
    try {
        console.log('🛒 Adding product to invoice:', {name, quantity, price});
        
        // Validate inputs
        if (!name || name.trim() === '') {
            console.error('❌ Product name is required');
            alert('Product name is required');
            return false;
        }
        
        // Ensure invoiceData is properly initialized
        if (!invoiceData || !Array.isArray(invoiceData.items)) {
            console.error('❌ invoiceData not properly initialized!');
            return false;
        }
        
        // Ensure we have valid values
        const productQuantity = parseFloat(quantity) || 1;
        const productPrice = parseFloat(price) || 0;
        
        console.log('✅ Processed values:', {productQuantity, productPrice});
        
        // Check if product already exists in invoice
        const existingProduct = invoiceData.items.find(item => 
            item.name.toLowerCase().trim() === name.toLowerCase().trim()
        );
        
        if (existingProduct) {
            // If product exists, increment quantity
            existingProduct.quantity += productQuantity;
            existingProduct.total = existingProduct.quantity * existingProduct.price;
            console.log('🔄 Updated existing product:', existingProduct);
        } else {
            // Create new product
            const product = {
                name: name.trim(),
                quantity: productQuantity,
                price: productPrice,
                total: productQuantity * productPrice
            };
            
            // Add to invoice data
            invoiceData.items.push(product);
            console.log('➕ Added new product:', product);
        }
        
        console.log('📋 Total items in invoice:', invoiceData.items.length);
        
        // Force update display immediately with error handling
        try {
            console.log('🔄 Updating all displays...');
            
            // Check if invoice table exists
            const invoiceTable = document.getElementById('invoiceItems');
            console.log('📋 Invoice table found:', !!invoiceTable);
            
            if (typeof renderInvoiceItems === 'function') {
                renderInvoiceItems();
                console.log('✅ Invoice items rendered');
                
                // Verify the table was updated
                const rowCount = document.querySelectorAll('#invoiceItems tr').length;
                console.log('📊 Invoice table now has', rowCount, 'rows');
            } else {
                console.warn('⚠️ renderInvoiceItems function not found');
            }
            
            if (typeof updateSummary === 'function') {
                updateSummary();
                console.log('✅ Summary updated');
                
                // Verify total was updated
                const totalElement = document.getElementById('total');
                console.log('💰 Total now shows:', totalElement?.textContent);
            } else {
                console.warn('⚠️ updateSummary function not found');
            }
            
            if (typeof updateSidebarInfo === 'function') {
                updateSidebarInfo();
                console.log('✅ Sidebar updated');
                
                // Verify sidebar counts
                const sidebarCount = document.getElementById('sidebarProductCount');
                console.log('📊 Sidebar shows', sidebarCount?.textContent, 'products');
            } else {
                console.warn('⚠️ updateSidebarInfo function not found');
            }
            
            // Force a re-render if needed
            setTimeout(() => {
                const finalRowCount = document.querySelectorAll('#invoiceItems tr').length;
                console.log('🔍 Final verification - table rows:', finalRowCount);
                if (finalRowCount === 0 && invoiceData.items.length > 0) {
                    console.warn('⚠️ Display mismatch detected, forcing re-render...');
                    forceDisplayUpdate();
                }
            }, 100);
            
        } catch (error) {
            console.error('❌ Error updating display:', error);
            alert('Error updating invoice display. Product was added but display may not reflect changes.');
        }
        
        // Show success feedback on button
        showButtonSuccess(event, name);
        
        // Show toast notification
        if (typeof showAddProductNotification === 'function') {
            showAddProductNotification(name, existingProduct ? 'updated' : 'added');
        }
        
        // Scroll to invoice table to show the added product
        setTimeout(() => {
            const invoiceTable = document.getElementById('invoiceTable');
            if (invoiceTable) {
                invoiceTable.scrollIntoView({ behavior: 'smooth', block: 'center' });
                console.log('📜 Scrolled to invoice table');
            }
        }, 300);
        
        return true;
        
    } catch (error) {
        console.error('❌ Critical error in addCatalogProduct:', error);
        alert('Failed to add product to invoice. Please try again.');
        return false;
    }
}

// Helper function for button success feedback
function showButtonSuccess(event, productName) {
    const button = event ? event.target : null;
    if (!button) return;
    
    try {
        const originalText = button.innerHTML;
        const originalBackground = button.style.background;
        
        // Show success feedback
        button.innerHTML = '✅ Added!';
        button.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        button.style.transform = 'scale(1.05)';
        button.disabled = true;
        
        // Reset button after feedback
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = originalBackground || 'linear-gradient(135deg, #00b894, #00cec9)';
            button.style.transform = 'scale(1)';
            button.disabled = false;
        }, 1000);
        
        console.log('✅ Button feedback shown for:', productName);
        
    } catch (error) {
        console.error('❌ Error showing button feedback:', error);
    }
}

// Initialize invoice functionality
function initializeInvoice() {
    console.log('Initializing invoice functionality...');
    
    // Make sure invoice data is properly initialized
    if (!invoiceData) {
        window.invoiceData = {
            items: [],
            deliveryFee: 0.00
        };
    }
    
    // Restore sidebar state
    restoreSidebarState();
    
    // Restore buyer name print preference
    restoreBuyerNamePrintState();
    
    // Ensure all totals are correctly calculated
    recalculateAllTotals();
    
    // Initial render
    renderInvoiceItems();
    updateSummary();
    
    console.log('Invoice functionality initialized');
}

// Test function to add a sample product (for debugging)
function testAddProduct() {
    console.log('🧪 Testing add product functionality...');
    
    // Test 1: Add a simple product
    console.log('Test 1: Adding Test Product');
    const success1 = addCatalogProduct('Test Product', 1, 10.99);
    console.log('Test 1 result:', success1 ? '✅ PASS' : '❌ FAIL');
    
    // Test 2: Add another product
    setTimeout(() => {
        console.log('Test 2: Adding Another Product');
        const success2 = addCatalogProduct('Another Product', 2, 15.50);
        console.log('Test 2 result:', success2 ? '✅ PASS' : '❌ FAIL');
        
        // Test 3: Add duplicate product (should increase quantity)
        setTimeout(() => {
            console.log('Test 3: Adding duplicate Test Product');
            const success3 = addCatalogProduct('Test Product', 1, 10.99);
            console.log('Test 3 result:', success3 ? '✅ PASS' : '❌ FAIL');
            
            // Show final results
            setTimeout(() => {
                console.log('🏁 Final invoice state:', invoiceData);
                console.log('📊 Total items:', invoiceData.items.length);
                console.log('📋 Invoice table rows:', document.querySelectorAll('#invoiceItems tr').length);
                console.log('💰 Total displayed:', document.getElementById('total')?.textContent);
            }, 100);
        }, 500);
    }, 500);
}

// Force display update function for testing
function forceDisplayUpdate() {
    console.log('🔄 Force updating all displays...');
    try {
        renderInvoiceItems();
        updateSummary();
        updateSidebarInfo();
        console.log('✅ All displays updated successfully');
        return true;
    } catch (error) {
        console.error('❌ Error forcing display update:', error);
        return false;
    }
}

// Quick test function for add to invoice display
function quickTestInvoiceDisplay() {
    console.log('🚀 Quick test: Adding product and verifying display...');
    
    // Verify invoiceData exists
    if (!invoiceData) {
        console.error('❌ invoiceData not found!');
        return false;
    }
    
    // Clear any existing items first
    invoiceData.items = [];
    console.log('🧹 Cleared existing items');
    
    // Add a test product
    const testResult = addCatalogProduct('Quick Test Product', 1, 9.99);
    console.log('📦 Test product add result:', testResult);
    
    // Wait a moment then check results
    setTimeout(() => {
        console.log('📊 === TEST RESULTS ===');
        console.log('✓ Product added successfully:', testResult);
        console.log('✓ Items in invoiceData:', invoiceData?.items?.length || 0);
        console.log('✓ Table element exists:', !!document.getElementById('invoiceItems'));
        console.log('✓ Rows in invoice table:', document.querySelectorAll('#invoiceItems tr').length);
        console.log('✓ Total displayed:', document.getElementById('total')?.textContent);
        console.log('✓ Product count:', document.getElementById('productCount')?.textContent);
        console.log('✓ Sidebar count:', document.getElementById('sidebarProductCount')?.textContent);
        
        // Check if product data exists and table rows exist
        const hasData = invoiceData?.items?.length > 0;
        const hasRows = document.querySelectorAll('#invoiceItems tr').length > 0;
        const success = hasData && hasRows;
        
        console.log('🎯 Final Result:', success ? '✅ SUCCESS - Products display correctly!' : '❌ FAILED - Display issue detected');
        
        if (!success) {
            console.log('🔧 Attempting to fix display...');
            if (!hasData) console.log('❌ Issue: No data in invoiceData.items');
            if (!hasRows) console.log('❌ Issue: No rows in table');
            forceDisplayUpdate();
        }
        
        return success;
    }, 300);
}

// Test display functionality specifically
function testDisplayFunctionality() {
    console.log('🧪 === TESTING DISPLAY FUNCTIONALITY ===');
    
    // Step 1: Check basic setup
    console.log('Step 1: Checking basic setup...');
    const tableExists = !!document.getElementById('invoiceItems');
    const dataExists = !!window.invoiceData;
    console.log('- Invoice table exists:', tableExists);
    console.log('- invoiceData exists:', dataExists);
    
    if (!tableExists) {
        console.error('❌ CRITICAL: Invoice table (#invoiceItems) not found!');
        return false;
    }
    
    // Step 2: Initialize data
    console.log('Step 2: Initializing data...');
    if (!window.invoiceData) {
        // invoiceData already globally initialized
    }
    invoiceData.items = [];
    
    // Step 3: Test manual product addition
    console.log('Step 3: Adding test products manually...');
    invoiceData.items.push({
        name: 'Test Product 1',
        quantity: 1,
        price: 10.99,
        total: 10.99
    });
    
    invoiceData.items.push({
        name: 'Test Product 2', 
        quantity: 2,
        price: 15.50,
        total: 31.00
    });
    
    console.log('- Added', invoiceData.items.length, 'test products');
    
    // Step 4: Test render function
    console.log('Step 4: Testing render function...');
    try {
        renderInvoiceItems();
        console.log('✅ renderInvoiceItems() executed successfully');
    } catch (error) {
        console.error('❌ renderInvoiceItems() failed:', error);
        return false;
    }
    
    // Step 5: Verify display
    setTimeout(() => {
        const tableRows = document.querySelectorAll('#invoiceItems tr').length;
        console.log('Step 5: Display verification...');
        console.log('- Data items:', invoiceData.items.length);
        console.log('- Table rows:', tableRows);
        
        const success = tableRows === invoiceData.items.length && tableRows > 0;
        console.log('🎯 Display test result:', success ? '✅ WORKING' : '❌ NOT WORKING');
        
        return success;
    }, 100);
}

// Make functions globally accessible for testing and invoice functionality
window.addCatalogProduct = addCatalogProduct;
window.showButtonSuccess = showButtonSuccess;
window.testAddProduct = testAddProduct;
window.forceDisplayUpdate = forceDisplayUpdate;
window.quickTestInvoiceDisplay = quickTestInvoiceDisplay;
window.testDisplayFunctionality = testDisplayFunctionality;
window.debugAddToInvoice = debugAddToInvoice;
window.testSaveInvoice = testSaveInvoice;
window.testSaveAfterProducts = testSaveAfterProducts;
window.showSavedInvoices = showSavedInvoices;
window.testAuthentication = testAuthentication;
window.simulateLogin = simulateLogin;
window.testLogout = testLogout;
window.getLoginStatus = getLoginStatus;
window.testCustomerDatabase = testCustomerDatabase;
window.addSampleCustomers = addSampleCustomers;
window.showSavedCustomers = showSavedCustomers;

// Make invoice editing functions globally accessible
window.removeProduct = removeProduct;
window.editQuantity = editQuantity;
window.editPrice = editPrice;
window.editName = editName;
window.renderInvoiceItems = renderInvoiceItems;
window.updateSummary = updateSummary;
window.updateSidebarInfo = updateSidebarInfo;

// Make invoice management functions globally accessible
window.saveCurrentInvoice = saveCurrentInvoice;
window.loadInvoiceForEdit = loadInvoiceForEdit;
window.displaySavedInvoices = displaySavedInvoices;

// Make authentication functions globally accessible
window.checkAuthentication = checkAuthentication;
window.handleLogout = handleLogout;

// Make customer database functions globally accessible
window.saveCurrentCustomer = saveCurrentCustomer;
window.displaySavedCustomers = displaySavedCustomers;
window.loadSavedCustomer = loadSavedCustomer;
window.updateCustomerStats = updateCustomerStats;
window.deleteSavedCustomer = deleteSavedCustomer;
window.editSavedCustomer = editSavedCustomer;

// Verify function registration
console.log('🔗 Global functions registered:', {
    addCatalogProduct: typeof window.addCatalogProduct,
    showButtonSuccess: typeof window.showButtonSuccess,
    testAddProduct: typeof window.testAddProduct,
    forceDisplayUpdate: typeof window.forceDisplayUpdate,
    quickTestInvoiceDisplay: typeof window.quickTestInvoiceDisplay,
    testDisplayFunctionality: typeof window.testDisplayFunctionality,
    debugAddToInvoice: typeof window.debugAddToInvoice,
    testSaveInvoice: typeof window.testSaveInvoice,
    testSaveAfterProducts: typeof window.testSaveAfterProducts,
    showSavedInvoices: typeof window.showSavedInvoices,
    testAuthentication: typeof window.testAuthentication,
    simulateLogin: typeof window.simulateLogin,
    testLogout: typeof window.testLogout,
    getLoginStatus: typeof window.getLoginStatus,
    testCustomerDatabase: typeof window.testCustomerDatabase,
    addSampleCustomers: typeof window.addSampleCustomers,
    showSavedCustomers: typeof window.showSavedCustomers,
    removeProduct: typeof window.removeProduct,
    editQuantity: typeof window.editQuantity,
    editPrice: typeof window.editPrice,
    editName: typeof window.editName,
    renderInvoiceItems: typeof window.renderInvoiceItems,
    updateSummary: typeof window.updateSummary,
    updateSidebarInfo: typeof window.updateSidebarInfo,
    saveCurrentInvoice: typeof window.saveCurrentInvoice,
    loadInvoiceForEdit: typeof window.loadInvoiceForEdit,
    displaySavedInvoices: typeof window.displaySavedInvoices,
    checkAuthentication: typeof window.checkAuthentication,
    handleLogout: typeof window.handleLogout,
    saveCurrentCustomer: typeof window.saveCurrentCustomer,
    displaySavedCustomers: typeof window.displaySavedCustomers,
    loadSavedCustomer: typeof window.loadSavedCustomer,
    updateCustomerStats: typeof window.updateCustomerStats,
    deleteSavedCustomer: typeof window.deleteSavedCustomer,
    editSavedCustomer: typeof window.editSavedCustomer
});

// Test invoice display elements on page load and fix any issues
setTimeout(() => {
    console.log('🔍 Checking invoice display elements...');
    console.log('📋 Invoice table (invoiceItems):', !!document.getElementById('invoiceItems'));
    console.log('💰 Total element:', !!document.getElementById('total'));
    console.log('📊 Product count element:', !!document.getElementById('productCount'));
    console.log('📊 Sidebar product count:', !!document.getElementById('sidebarProductCount'));
    console.log('💸 Sidebar total:', !!document.getElementById('sidebarTotal'));
    console.log('🔧 InvoiceData initialized:', !!window.invoiceData);
    
    if (!document.getElementById('invoiceItems')) {
        console.error('❌ Critical: Invoice table not found! Products will not display.');
    } else {
        console.log('✅ All required elements found for invoice display');
        
        // Initialize empty display
        renderInvoiceItems();
        updateSummary();
        
        // Load and display saved invoices
        if (typeof displaySavedInvoices === 'function') {
            displaySavedInvoices();
            console.log('📂 Loaded saved invoices');
        }
        
        // Load and display saved customers
        if (typeof displaySavedCustomers === 'function') {
            displaySavedCustomers();
            console.log('👥 Loaded saved customers');
        }
        
        // Check authentication status
        console.log('🔐 Checking authentication status...');
        const authStatus = sessionStorage.getItem('adminLoggedIn');
        const currentUser = sessionStorage.getItem('adminUser');
        
        if (authStatus === 'true' && currentUser) {
            console.log('✅ User authenticated:', currentUser);
        } else {
            console.log('⚠️ User not authenticated - limited functionality');
        }
        
        console.log('🎯 Invoice display initialized successfully');
    }
}, 1000);

// Debug function to test add to invoice functionality
function debugAddToInvoice() {
    console.log('🐛 === DEBUGGING ADD TO INVOICE ===');
    
    console.log('Step 1: Checking invoiceData...');
    console.log('- invoiceData exists:', !!invoiceData);
    console.log('- items array:', invoiceData?.items);
    
    console.log('Step 2: Testing add product...');
    const result = addCatalogProduct('Debug Test Product', 1, 12.99);
    console.log('- Add result:', result);
    
    setTimeout(() => {
        console.log('Step 3: Checking results...');
        console.log('- Items in data:', invoiceData.items.length);
        console.log('- Table rows:', document.querySelectorAll('#invoiceItems tr').length);
        console.log('- Product count display:', document.getElementById('productCount')?.textContent);
        
        const success = invoiceData.items.length > 0 && document.querySelectorAll('#invoiceItems tr').length > 0;
        console.log('🎯 Debug result:', success ? '✅ WORKING' : '❌ NOT WORKING');
        
        if (!success) {
            console.log('🔧 Attempting manual fix...');
            renderInvoiceItems();
            updateSummary();
        }
    }, 200);
}

// Test save invoice functionality
function testSaveInvoice() {
    console.log('💾 === TESTING SAVE INVOICE FUNCTIONALITY ===');
    
    console.log('Step 1: Checking requirements...');
    console.log('- invoiceData exists:', !!invoiceData);
    console.log('- localStorage available:', typeof Storage !== 'undefined');
    console.log('- saveCurrentInvoice function:', typeof saveCurrentInvoice);
    
    if (invoiceData.items.length === 0) {
        console.log('Step 2: Adding test products...');
        addCatalogProduct('Test Product 1', 2, 15.99);
        addCatalogProduct('Test Product 2', 1, 24.50);
        
        setTimeout(() => {
            console.log('Step 3: Testing save...');
            testSaveAfterProducts();
        }, 500);
    } else {
        console.log('Step 2: Products already exist, testing save...');
        testSaveAfterProducts();
    }
}

function testSaveAfterProducts() {
    console.log('💾 Testing save with current products...');
    console.log('- Products to save:', invoiceData.items.length);
    console.log('- Total value:', invoiceData.items.reduce((sum, item) => sum + item.total, 0));
    
    // Fill in buyer info for testing
    const buyerNameField = document.getElementById('buyerName');
    const buyerPhoneField = document.getElementById('buyerPhone');
    
    if (buyerNameField && !buyerNameField.value) {
        buyerNameField.value = 'Test Customer';
    }
    if (buyerPhoneField && !buyerPhoneField.value) {
        buyerPhoneField.value = '123-456-7890';
    }
    
    console.log('Step 4: Calling saveCurrentInvoice...');
    const result = saveCurrentInvoice();
    console.log('Save result:', result);
    
    // Check if it was actually saved
    setTimeout(() => {
        const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
        console.log('Step 5: Verification...');
        console.log('- Invoices in storage:', savedInvoices.length);
        console.log('- Latest invoice:', savedInvoices[0]);
        
        const success = savedInvoices.length > 0 && savedInvoices[0].items.length > 0;
        console.log('🎯 Save test result:', success ? '✅ WORKING' : '❌ NOT WORKING');
    }, 200);
}

// Show saved invoices in console for debugging
function showSavedInvoices() {
    console.log('📂 === SAVED INVOICES ===');
    try {
        const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
        console.log('Total saved invoices:', savedInvoices.length);
        
        if (savedInvoices.length === 0) {
            console.log('No invoices saved yet.');
        } else {
            savedInvoices.forEach((invoice, index) => {
                console.log(`${index + 1}. Invoice ID: ${invoice.id}`);
                console.log(`   Date: ${invoice.date}`);
                console.log(`   Customer: ${invoice.buyerName}`);
                console.log(`   Items: ${invoice.itemCount}`);
                console.log(`   Total: $${invoice.total.toFixed(2)}`);
                console.log('   ---');
            });
        }
    } catch (error) {
        console.error('Error reading saved invoices:', error);
    }
}

// Test authentication functionality
function testAuthentication() {
    console.log('🔐 === TESTING AUTHENTICATION SYSTEM ===');
    
    // Check current authentication status
    console.log('Step 1: Checking current authentication status...');
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const adminUser = sessionStorage.getItem('adminUser');
    const loginTime = sessionStorage.getItem('loginTime');
    
    console.log('- Logged in status:', isLoggedIn);
    console.log('- Admin user:', adminUser);
    console.log('- Login time:', loginTime);
    
    if (isLoggedIn === 'true') {
        console.log('✅ User is currently authenticated');
        console.log('- User:', adminUser);
        console.log('- Session duration:', loginTime ? Math.round((new Date() - new Date(loginTime)) / (1000 * 60)) + ' minutes' : 'Unknown');
        
        // Test logout functionality
        console.log('Step 2: Testing logout functionality...');
        console.log('- handleLogout function available:', typeof handleLogout);
        console.log('- To test logout, call: handleLogout()');
        
    } else {
        console.log('❌ User is not authenticated');
        console.log('- Redirect to login should happen automatically');
        console.log('- Login page: login.html');
        console.log('- Valid credentials: AdmiNs/Nimda258508-| or Xing/Sing--|');
    }
    
    // Check authentication functions
    console.log('Step 3: Checking authentication functions...');
    console.log('- checkAuthentication:', typeof checkAuthentication);
    console.log('- handleLogout:', typeof handleLogout);
    
    // Check UI elements
    console.log('Step 4: Checking UI elements...');
    console.log('- Admin username element:', !!document.getElementById('adminUsername'));
    console.log('- Login time element:', !!document.getElementById('loginTime'));
    console.log('- Logout button exists:', !!document.querySelector('button[onclick="handleLogout()"]'));
    
    console.log('🎯 Authentication test completed');
}

// Simulate login (for testing purposes)
function simulateLogin(username = 'AdmiNs') {
    console.log('🎭 Simulating login for testing...');
    
    if (username === 'AdmiNs' || username === 'Xing') {
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminUser', username);
        sessionStorage.setItem('loginTime', new Date().toISOString());
        
        console.log('✅ Simulated login successful');
        console.log('- User:', username);
        console.log('- Time:', new Date().toLocaleString());
        
        // Refresh authentication
        if (typeof checkAuthentication === 'function') {
            checkAuthentication();
            console.log('✅ Authentication refreshed');
        }
        
        return true;
    } else {
        console.log('❌ Invalid username for simulation');
        return false;
    }
}

// Test logout functionality
function testLogout() {
    console.log('🚪 Testing logout functionality...');
    
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        console.log('✅ User is logged in, testing logout...');
        
        // Store current user info
        const currentUser = sessionStorage.getItem('adminUser');
        console.log('- Current user:', currentUser);
        
        // Test logout (with confirmation bypass)
        if (typeof handleLogout === 'function') {
            // Temporarily override confirm for testing
            const originalConfirm = window.confirm;
            window.confirm = () => true;
            
            try {
                handleLogout();
                console.log('✅ Logout function executed');
            } catch (error) {
                console.error('❌ Error during logout:', error);
            } finally {
                // Restore original confirm
                window.confirm = originalConfirm;
            }
        } else {
            console.log('❌ handleLogout function not available');
        }
    } else {
        console.log('❌ No user logged in to test logout');
    }
}

// Check current login status
function getLoginStatus() {
    console.log('📊 === CURRENT LOGIN STATUS ===');
    
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const adminUser = sessionStorage.getItem('adminUser');
    const loginTime = sessionStorage.getItem('loginTime');
    
    if (isLoggedIn === 'true' && adminUser) {
        const loginDate = new Date(loginTime);
        const sessionDuration = Math.round((new Date() - loginDate) / (1000 * 60));
        
        console.log('✅ LOGGED IN');
        console.log('👤 User:', adminUser);
        console.log('🕒 Login Time:', loginDate.toLocaleString());
        console.log('⏰ Session Duration:', sessionDuration, 'minutes');
        console.log('🔒 Session Valid:', sessionDuration < 30 ? 'Yes' : 'Expired');
        
        return {
            loggedIn: true,
            user: adminUser,
            loginTime: loginDate,
            duration: sessionDuration,
            valid: sessionDuration < 30
        };
    } else {
        console.log('❌ NOT LOGGED IN');
        console.log('🔄 Need to login at: login.html');
        console.log('📋 Valid users: AdmiNs, Xing');
        
        return {
            loggedIn: false,
            user: null,
            loginTime: null,
            duration: 0,
            valid: false
        };
    }
}

// Test customer database functionality
function testCustomerDatabase() {
    console.log('👥 === TESTING CUSTOMER DATABASE ===');
    
    console.log('Step 1: Checking customer database functions...');
    console.log('- saveCurrentCustomer:', typeof saveCurrentCustomer);
    console.log('- displaySavedCustomers:', typeof displaySavedCustomers);
    console.log('- loadSavedCustomer:', typeof loadSavedCustomer);
    console.log('- deleteSavedCustomer:', typeof deleteSavedCustomer);
    
    console.log('Step 2: Checking UI elements...');
    console.log('- Customer history container:', !!document.getElementById('customerHistory'));
    console.log('- Total customers display:', !!document.getElementById('totalCustomers'));
    console.log('- Buyer name field:', !!document.getElementById('buyerName'));
    console.log('- Buyer phone field:', !!document.getElementById('buyerPhone'));
    console.log('- Buyer location field:', !!document.getElementById('buyerLocation'));
    
    console.log('Step 3: Checking saved customers...');
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    console.log('- Saved customers count:', savedCustomers.length);
    
    if (savedCustomers.length > 0) {
        console.log('- Latest customer:', savedCustomers[0]);
        console.log('- Customers:', savedCustomers.map(c => c.name).join(', '));
    }
    
    console.log('🎯 Customer database test completed');
}

// Add sample customers for testing
function addSampleCustomers() {
    console.log('👥 Adding sample customers...');
    
    const sampleCustomers = [
        {
            id: Date.now().toString(),
            name: 'John Smith',
            phone: '123-456-7890',
            location: '123 Main St, City',
            createdAt: new Date().toISOString(),
            lastUsed: new Date().toISOString()
        },
        {
            id: (Date.now() + 1).toString(),
            name: 'Jane Doe',
            phone: '987-654-3210',
            location: '456 Oak Ave, Town',
            createdAt: new Date().toISOString(),
            lastUsed: new Date().toISOString()
        },
        {
            id: (Date.now() + 2).toString(),
            name: 'Mike Johnson',
            phone: '555-123-4567',
            location: '789 Pine Rd, Village',
            createdAt: new Date().toISOString(),
            lastUsed: new Date().toISOString()
        }
    ];
    
    let savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    
    // Add sample customers if they don't exist
    sampleCustomers.forEach(newCustomer => {
        const exists = savedCustomers.find(c => c.name === newCustomer.name);
        if (!exists) {
            savedCustomers.unshift(newCustomer);
            console.log('➕ Added sample customer:', newCustomer.name);
        }
    });
    
    localStorage.setItem('savedCustomers', JSON.stringify(savedCustomers));
    
    // Refresh display
    displaySavedCustomers();
    updateCustomerStats();
    
    console.log('✅ Sample customers added and display refreshed');
}

// Show all saved customers in console
function showSavedCustomers() {
    console.log('👥 === SAVED CUSTOMERS ===');
    
    try {
        const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
        console.log('Total customers:', savedCustomers.length);
        
        if (savedCustomers.length === 0) {
            console.log('No customers saved yet.');
        } else {
            savedCustomers.forEach((customer, index) => {
                console.log(`${index + 1}. ${customer.name}`);
                console.log(`   Phone: ${customer.phone || 'N/A'}`);
                console.log(`   Location: ${customer.location || 'N/A'}`);
                console.log(`   Last Used: ${customer.lastUsed ? new Date(customer.lastUsed).toLocaleString() : 'N/A'}`);
                console.log('   ---');
            });
        }
    } catch (error) {
        console.error('Error reading saved customers:', error);
    }
}

// Call initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeInvoice();
        checkForViewInvoice();
    });
} else {
    initializeInvoice();
    checkForViewInvoice();
}

// Check if we need to load a specific invoice for viewing
function checkForViewInvoice() {
    const viewInvoiceId = sessionStorage.getItem('viewInvoiceId');
    if (viewInvoiceId) {
        sessionStorage.removeItem('viewInvoiceId');
        loadInvoiceForViewing(viewInvoiceId);
    }
}

// Load invoice data for viewing
function loadInvoiceForViewing(invoiceId) {
    try {
        const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
        const invoice = savedInvoices.find(inv => inv.id === invoiceId);
        
        if (!invoice) {
            console.error('Invoice not found:', invoiceId);
            alert('Invoice not found!');
            return;
        }

        console.log('Loading invoice for viewing:', invoice);

        // Clear current invoice
        invoiceData.items = [];
        
        // Load invoice date
        if (invoice.date) {
            const dateInput = document.getElementById('invoiceDate');
            if (dateInput) dateInput.value = invoice.date;
        }

        // Load buyer information
        if (invoice.buyerInfo) {
            const buyerNameInput = document.getElementById('buyerName');
            const buyerPhoneInput = document.getElementById('buyerPhone');
            const buyerLocationInput = document.getElementById('buyerLocation');
            
            if (buyerNameInput) buyerNameInput.value = invoice.buyerInfo.name || '';
            if (buyerPhoneInput) buyerPhoneInput.value = invoice.buyerInfo.phone || '';
            if (buyerLocationInput) buyerLocationInput.value = invoice.buyerInfo.location || '';
        }

        // Load delivery fee
        if (invoice.deliveryFee) {
            invoiceData.deliveryFee = invoice.deliveryFee;
            const deliveryFeeInput = document.getElementById('deliveryFeeInput');
            if (deliveryFeeInput) deliveryFeeInput.value = invoice.deliveryFee.toFixed(2);
        }

        // Load items
        if (invoice.items && Array.isArray(invoice.items)) {
            invoice.items.forEach(item => {
                invoiceData.items.push({
                    description: item.description,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.total
                });
            });
        }

        // Update display
        updateInvoiceDisplay();
        updateTotal();
        
        console.log('Invoice loaded successfully');
        
    } catch (error) {
        console.error('Error loading invoice:', error);
        alert('Error loading invoice: ' + error.message);
    }
}

// Show notification when product is added
function showAddProductNotification(productName, action) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'product-notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.5rem;">${action === 'added' ? '✅' : '🔄'}</span>
            <div>
                <div style="font-weight: 600; color: #fff;">${action === 'added' ? 'Product Added!' : 'Quantity Updated!'}</div>
                <div style="font-size: 0.9rem; color: rgba(255,255,255,0.9);">${productName}</div>
            </div>
        </div>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '80px',
        right: '20px',
        background: action === 'added' ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #007bff, #0056b3)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        fontSize: '0.95rem'
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Clear all products from invoice (for sidebar button)
function clearInvoice() {
    if (confirm('Are you sure you want to clear all items?')) {
        invoiceData.items = [];
        renderInvoiceItems();
        updateSummary();
    }
}

// Print invoice (for sidebar button)
function printInvoice() {
    const showOnPrint = localStorage.getItem('showBuyerNameOnPrint') !== 'false'; // Default to true

    // Apply print class if buyer name should be hidden
    if (!showOnPrint) {
        document.body.classList.add('hide-buyer-name-print');
        console.log('🖨️ Printing with buyer name hidden');
    } else {
        document.body.classList.remove('hide-buyer-name-print');
        console.log('🖨️ Printing with buyer name visible');
    }

    // Trigger print
    window.print();

    // Remove the print class after a short delay (after print dialog)
    setTimeout(() => {
        document.body.classList.remove('hide-buyer-name-print');
    }, 100);
}

// Remove all products from invoice
function removeAllProducts() {
    invoiceData.items = [];
    renderInvoiceItems();
    updateSummary();
}

// Legacy addProduct function (kept for compatibility)
function addProduct() {
    console.log('⚠️ Legacy addProduct called - use addCatalogProduct instead');
}

function removeProduct(index) {
    if (index >= 0 && index < invoiceData.items.length) {
        invoiceData.items.splice(index, 1);
        renderInvoiceItems();
        updateSummary();
    }
}

function removeAllProducts() {
    invoiceData.items = [];
    renderInvoiceItems();
    updateSummary();
}

function editQuantity(index, newQuantity) {
    if (index >= 0 && index < invoiceData.items.length) {
        const item = invoiceData.items[index];
        item.quantity = parseFloat(newQuantity) || 0;
        item.total = item.quantity * item.price;
        console.log(`✏️ Updated quantity: ${item.quantity} × $${item.price.toFixed(2)} = $${item.total.toFixed(2)}`);
        renderInvoiceItems(); // Re-render to show updated total
        updateSummary();
    }
}

function editPrice(index, newPrice) {
    if (index >= 0 && index < invoiceData.items.length) {
        const item = invoiceData.items[index];
        item.price = parseFloat(newPrice) || 0;
        item.total = item.quantity * item.price;
        console.log(`💰 Updated price: ${item.quantity} × $${item.price.toFixed(2)} = $${item.total.toFixed(2)}`);
        renderInvoiceItems(); // Re-render to show updated total
        updateSummary();
    }
}

function editName(index, newName) {
    if (index >= 0 && index < invoiceData.items.length) {
        const item = invoiceData.items[index];
        item.name = newName.trim();
    }
}

// Helper function to ensure all totals are correctly calculated
function recalculateAllTotals() {
    let itemsUpdated = 0;
    invoiceData.items.forEach(item => {
        const calculatedTotal = item.quantity * item.price;
        if (item.total !== calculatedTotal) {
            item.total = calculatedTotal;
            itemsUpdated++;
            console.log(`🔄 Recalculated: ${item.name} - ${item.quantity} × $${item.price.toFixed(2)} = $${item.total.toFixed(2)}`);
        }
    });
    
    if (itemsUpdated > 0) {
        console.log(`✅ Recalculated ${itemsUpdated} item totals`);
        renderInvoiceItems();
        updateSummary();
    }
    
    return itemsUpdated;
}

function renderInvoiceItems() {
    console.log('📋 Rendering invoice items:', invoiceData.items); // Debug log
    
    // Ensure invoiceData exists
    if (!invoiceData || !Array.isArray(invoiceData.items)) {
        console.error('❌ invoiceData not properly initialized');
        return;
    }
    
    const tbody = document.getElementById('invoiceItems');
    if (!tbody) {
        console.error('❌ Invoice items tbody not found!');
        return;
    }
    
    console.log('✅ Found invoice table, clearing contents...');
    tbody.innerHTML = '';
    
    // Update product count in multiple places
    const productCountElement = document.getElementById('productCount');
    if (productCountElement) {
        productCountElement.textContent = invoiceData.items.length;
        console.log('✅ Updated main product count:', invoiceData.items.length);
    }
    
    if (invoiceData.items.length === 0) {
        console.log('📝 No items to display, showing empty message');
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="6" style="text-align: center; color: #666; font-style: italic; padding: 2rem; background: #f8f9fa; border-radius: 8px;">
                🛒 No products added yet. Use the Product Catalog to add items.
            </td>
        `;
        tbody.appendChild(emptyRow);
        console.log('✅ Empty message displayed');
        return;
    }
    
    console.log('📊 Creating', invoiceData.items.length, 'product rows...');
    
    invoiceData.items.forEach((item, index) => {
        console.log('📦 Creating row for:', item.name);
        const row = document.createElement('tr');
        
        // Alternate row colors
        if (index % 2 === 0) {
            row.style.backgroundColor = '#f8f9fa';
        }
        
        // Add highlight animation for newly added items
        row.style.transition = 'all 0.3s ease';
        
        row.innerHTML = `
            <td style="text-align: center; font-weight: bold; color: #666; width: 50px; padding: 12px;">${index + 1}</td>
            <td style="padding: 12px;">
                <input type="text" value="${item.name}" onchange="editName(${index}, this.value)" 
                       style="width: 100%; border: none; background: transparent; font-family: inherit; font-weight: 500; padding: 4px;">
            </td>
            <td style="padding: 12px;">
                <input type="number" value="${item.quantity}" min="0" step="0.01" onchange="editQuantity(${index}, this.value)" 
                       style="width: 100%; border: none; background: transparent; text-align: center; font-weight: 500; padding: 4px;">
            </td>
            <td style="padding: 12px;">
                <input type="number" value="${item.price.toFixed(2)}" min="0" step="0.01" onchange="editPrice(${index}, this.value)" 
                       style="width: 100%; border: none; background: transparent; text-align: right; font-weight: 500; padding: 4px;">
            </td>
            <td style="text-align: right; font-weight: bold; color: #007bff; padding: 12px; font-size: 1.1rem;">
                $${item.total.toFixed(2)}
            </td>
            <td style="text-align: center; padding: 12px;">
                <button onclick="removeProduct(${index})" 
                        style="background: linear-gradient(135deg, #dc3545, #c82333); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 500; transition: all 0.2s ease;"
                        onmouseover="this.style.transform='scale(1.05)'"
                        onmouseout="this.style.transform='scale(1)'">
                    🗑️ Remove
                </button>
            </td>
        `;
        tbody.appendChild(row);
        console.log('✅ Row added for:', item.name);
        
        // Add subtle animation for new items
        if (index === invoiceData.items.length - 1) {
            setTimeout(() => {
                row.style.background = '#e8f5e8';
                setTimeout(() => {
                    row.style.background = index % 2 === 0 ? '#f8f9fa' : '';
                }, 1000);
            }, 100);
        }
    });
    
    console.log('✅ All', invoiceData.items.length, 'invoice items rendered successfully'); 
    
    // Verify rows were actually added
    const finalRowCount = tbody.querySelectorAll('tr').length;
    console.log('🔍 Final verification: Table now has', finalRowCount, 'rows');
    
    if (finalRowCount !== invoiceData.items.length) {
        console.warn('⚠️ Row count mismatch! Expected:', invoiceData.items.length, 'Actual:', finalRowCount);
    }
}

function updateSummary() {
    console.log('Updating summary...'); // Debug log
    
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.total, 0);
    const total = subtotal + invoiceData.deliveryFee;
    
    console.log('Subtotal:', subtotal, 'Total:', total); // Debug log
    
    // Update the main total display
    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
        
        // Add animation to highlight the change
        totalElement.style.transform = 'scale(1.1)';
        totalElement.style.color = '#28a745';
        setTimeout(() => {
            totalElement.style.transform = 'scale(1)';
            totalElement.style.color = '';
        }, 300);
    }
    
    // Update delivery fee input to match current value
    const deliveryInput = document.getElementById('deliveryFeeInput');
    if (deliveryInput) {
        deliveryInput.value = invoiceData.deliveryFee.toFixed(2);
    }
    
    // Update print version of delivery fee
    const deliveryPrint = document.getElementById('deliveryFeePrint');
    if (deliveryPrint) {
        deliveryPrint.textContent = `$${invoiceData.deliveryFee.toFixed(2)}`;
    }
    
    // Update sidebar info
    updateSidebarInfo();
    
    console.log('Summary updated successfully'); // Debug log
}

function updateSidebarInfo() {
    // Update main product count
    const productCountElement = document.getElementById('productCount');
    if (productCountElement) {
        productCountElement.textContent = invoiceData.items.length;
    }
    
    // Update sidebar product count
    const sidebarProductCountElement = document.getElementById('sidebarProductCount');
    if (sidebarProductCountElement) {
        sidebarProductCountElement.textContent = invoiceData.items.length;
    }
    
    // Calculate totals
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.total, 0);
    const grandTotal = subtotal + invoiceData.deliveryFee;
    
    // Update sidebar total
    const sidebarTotalElement = document.getElementById('sidebarTotal');
    if (sidebarTotalElement) {
        sidebarTotalElement.textContent = `$${grandTotal.toFixed(2)}`;
    }
    
    // Update products summary in sidebar
    updateProductsSummary();
}

function updateProductsSummary() {
    const productsSummary = document.getElementById('productsSummary');
    if (!productsSummary) return;
    
    if (invoiceData.items.length === 0) {
        productsSummary.innerHTML = '<em>No products added</em>';
        return;
    }
    
    let summaryHtml = '';
    invoiceData.items.forEach(item => {
        summaryHtml += `
            <div class="product-item">
                <span class="product-name">${item.name}</span>
                <span class="product-qty">×${item.quantity}</span>
                <span class="product-total">$${item.total.toFixed(2)}</span>
            </div>
        `;
    });
    
    productsSummary.innerHTML = summaryHtml;
}

// Toggle product catalog visibility
function toggleProductCatalog() {
    const catalogOverlay = document.getElementById('catalogOverlay');
    
    if (catalogOverlay) {
        if (catalogOverlay.style.display === 'none' || catalogOverlay.style.display === '') {
            // Show catalog
            catalogOverlay.style.display = 'flex';
            renderCatalogProducts(); // Use our updated function
            initializeCatalogSidebar(); // Initialize sidebar
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            // Hide catalog
            catalogOverlay.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    }
}

// Sidebar wrapper functions
function showProductCatalog() {
    const catalogOverlay = document.getElementById('catalogOverlay');
    if (catalogOverlay) {
        catalogOverlay.style.display = 'flex';
        renderProductCatalog();
        // Reset search when opening catalog
        resetGlobalSearch();
    }
}

// Global search functionality
let currentSearchFilter = 'all';
let allProducts = [];

function initializeProductSearch() {
    // Build searchable products array
    allProducts = [];
    Object.keys(productDatabase).forEach(category => {
        productDatabase[category].products.forEach(product => {
            allProducts.push({
                ...product,
                category: category.toLowerCase(),
                searchText: `${product.name} ${product.brand || ''} ${category}`.toLowerCase()
            });
        });
    });
}

function resetGlobalSearch() {
    const searchInput = document.getElementById('globalProductSearch');
    const suggestions = document.getElementById('globalSuggestions');
    if (searchInput) {
        searchInput.value = '';
    }
    if (suggestions) {
        suggestions.style.display = 'none';
    }
    setSearchFilter('all');
    updateSearchResultsSummary();
}

function searchAllProducts(query) {
    const trimmedQuery = query.trim().toLowerCase();
    
    if (!trimmedQuery) {
        showAllProducts();
        hideGlobalSuggestions();
        return;
    }
    
    // Search all products and brands without any filtering
    let filteredProducts = allProducts.filter(product => {
        return product.searchText.includes(trimmedQuery);
    });
    
    // Show filtered results
    renderFilteredProducts(filteredProducts);
    updateSearchResultsSummary(filteredProducts.length, trimmedQuery);
    
    // Update suggestions
    showSearchSuggestions(trimmedQuery);
}

function showSearchSuggestions(query) {
    if (!query || query.length < 1) {
        hideGlobalSuggestions();
        return;
    }
    
    // Get top 10 suggestions from all products and brands
    let suggestions = allProducts.filter(product => {
        return product.searchText.includes(query.toLowerCase());
    }).slice(0, 10);
    
    // Also get brand suggestions to show variety
    let brandSuggestions = getBrandSuggestions(query);
    
    // Mix product and brand suggestions (prioritize exact matches)
    let combinedSuggestions = [];
    
    // Add brand suggestions first if they match
    if (brandSuggestions.length > 0) {
        combinedSuggestions = combinedSuggestions.concat(brandSuggestions.slice(0, 3));
    }
    
    // Add product suggestions, avoiding duplicates
    let productCount = 0;
    for (let product of suggestions) {
        if (productCount >= 7) break; // Limit total suggestions to 10
        combinedSuggestions.push(product);
        productCount++;
    }
    
    suggestions = combinedSuggestions.slice(0, 10);
    
    const suggestionsContainer = document.getElementById('globalSuggestions');
    
    if (suggestions.length === 0) {
        // Hide suggestions when no matches found
        hideGlobalSuggestions();
        return;
    }
    
    const html = suggestions.map(product => {
        const isGroupedBrand = product.isGroupedBrand;
        if (isGroupedBrand) {
            return `
                <div class="suggestion-item brand-suggestion" onclick="searchForBrand('${product.brand}')">
                    <div class="suggestion-brand">🏷️ ${product.brand}</div>
                    <div class="suggestion-count">${product.count} products</div>
                </div>
            `;
        } else {
            return `
                <div class="suggestion-item" onclick="selectProductFromSuggestion('${product.id}', '${product.name}')">
                    <div class="suggestion-category">${product.category}</div>
                    <div class="suggestion-content">
                        <div class="suggestion-name">${highlightMatch(product.name, query)}</div>
                        ${product.brand ? `<div class="suggestion-brand-info">by ${highlightMatch(product.brand, query)}</div>` : ''}
                    </div>
                    <div class="suggestion-price">$${product.price}</div>
                </div>
            `;
        }
    }).join('');
    
    suggestionsContainer.innerHTML = html;
    suggestionsContainer.style.display = 'block';
}

function getBrandSuggestions(query) {
    const brandGroups = {};
    const queryLower = query.toLowerCase();
    
    // Group products by brand that match the query
    allProducts.forEach(product => {
        if (product.brand && product.brand.toLowerCase().includes(queryLower)) {
            if (!brandGroups[product.brand]) {
                brandGroups[product.brand] = {
                    brand: product.brand,
                    count: 0,
                    isGroupedBrand: true
                };
            }
            brandGroups[product.brand].count++;
        }
    });
    
    // Convert to array and limit to 8 results
    return Object.values(brandGroups).slice(0, 8);
}

function searchForBrand(brandName) {
    const searchInput = document.getElementById('globalProductSearch');
    if (searchInput) {
        searchInput.value = brandName;
        setSearchFilter('all'); // Reset to all categories when searching by brand
        searchAllProducts(brandName);
    }
    hideGlobalSuggestions();
}

function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}

function selectProductFromSuggestion(productId, productName) {
    // Add product to invoice
    const product = allProducts.find(p => p.id == productId);
    if (product) {
        addProductToInvoiceDirectly(product);
        // Close catalog after adding
        toggleProductCatalog();
    }
}

function showGlobalSuggestions(query) {
    if (query && query.length >= 2) {
        showSearchSuggestions(query);
    }
}

function hideGlobalSuggestions() {
    setTimeout(() => {
        const suggestions = document.getElementById('globalSuggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }
    }, 200);
}

function setSearchFilter(filter) {
    // Keep filter as 'all' since we removed filter buttons
    currentSearchFilter = 'all';
    
    // Re-run search with current query
    const searchInput = document.getElementById('globalProductSearch');
    if (searchInput && searchInput.value) {
        searchAllProducts(searchInput.value);
    } else {
        showAllProducts();
    }
}

function showAllProducts() {
    // Always show all products and brands
    renderFilteredProducts(allProducts);
    updateSearchResultsSummary(allProducts.length, '', 'all products and brands');
}

function renderBrandView() {
    const catalog = document.getElementById('productCatalog');
    
    // Group products by brand
    const brandGroups = {};
    allProducts.forEach(product => {
        if (product.brand) {
            if (!brandGroups[product.brand]) {
                brandGroups[product.brand] = [];
            }
            brandGroups[product.brand].push(product);
        }
    });
    
    const sortedBrands = Object.keys(brandGroups).sort();
    
    let html = '';
    sortedBrands.forEach(brandName => {
        const products = brandGroups[brandName];
        html += `
            <div class="category-section">
                <div class="category-dropdown">
                    <div class="category-header" onclick="toggleCategoryDropdown('brand-${brandName.replace(/\s+/g, '-')}')">
                        <div class="category-info">
                            <div class="category-title">🏷️ ${brandName}</div>
                            <div class="product-count">${products.length} products</div>
                        </div>
                        <div class="dropdown-arrow" id="arrow-brand-${brandName.replace(/\s+/g, '-')}">▼</div>
                    </div>
                    <div class="products-container" id="products-brand-${brandName.replace(/\s+/g, '-')}" style="display: none;">
                        <div class="products-grid">
                            ${products.map(product => createProductCard(product)).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    catalog.innerHTML = html;
    updateSearchResultsSummary(allProducts.filter(p => p.brand).length, '', 'brands grouped by brand name');
}

function renderFilteredProducts(products) {
    const catalog = document.getElementById('productCatalog');
    
    if (products.length === 0) {
        // Show nothing when no products match
        catalog.innerHTML = '';
        return;
    }
    
    // Group products by category
    const grouped = {};
    products.forEach(product => {
        const category = product.category;
        if (!grouped[category]) {
            grouped[category] = [];
        }
        grouped[category].push(product);
    });
    
    let html = '';
    Object.keys(grouped).forEach(category => {
        const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
        html += `
            <div class="category-section">
                <div class="category-dropdown">
                    <div class="category-header expanded">
                        <div class="category-info">
                            <div class="category-title">${categoryTitle}</div>
                            <div class="product-count">${grouped[category].length} products found</div>
                        </div>
                    </div>
                    <div class="products-container" style="display: block;">
                        <div class="products-grid">
                            ${grouped[category].map(product => createProductCard(product)).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    catalog.innerHTML = html;
}

function updateSearchResultsSummary(count = null, query = '', customText = '') {
    const summaryElement = document.getElementById('searchResultsCount');
    if (!summaryElement) return;
    
    // Show nothing if count is 0
    if (count === 0) {
        summaryElement.textContent = '';
        return;
    }
    
    if (customText) {
        summaryElement.textContent = `Showing ${count} ${customText}`;
        return;
    }
    
    if (count === null) {
        // Show all products count
        summaryElement.textContent = `Showing ${allProducts.length} all products and brands`;
    } else {
        if (query) {
            summaryElement.textContent = `Found ${count} products for "${query}"`;
        } else {
            summaryElement.textContent = `Showing ${count} products`;
        }
    }
}

// Enhanced category search with suggestions
function searchCategoryProducts(category, query) {
    const trimmedQuery = query.trim().toLowerCase();
    const grid = document.getElementById(`grid-${category}`);
    const countElement = document.getElementById(`count-${category}`);
    const suggestionsContainer = document.getElementById(`suggestions-${category}`);
    
    if (!productDatabase[category] || !grid || !countElement) return;
    
    const products = productDatabase[category].products;
    
    if (!trimmedQuery) {
        // Show all products
        grid.innerHTML = products.map(product => createProductCard(product)).join('');
        countElement.textContent = `${products.length} products`;
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
        return;
    }
    
    // Filter products
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(trimmedQuery) ||
        (product.brand && product.brand.toLowerCase().includes(trimmedQuery))
    );
    
    // Update display
    grid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    countElement.textContent = `${filteredProducts.length} products`;
    
    // Show suggestions for category search
    showCategorySuggestions(category, trimmedQuery);
}

function showCategorySuggestions(category, query) {
    if (!query || query.length < 2) {
        hideCategorySuggestions(category);
        return;
    }
    
    const suggestionsContainer = document.getElementById(`suggestions-${category}`);
    if (!suggestionsContainer) return;
    
    const products = productDatabase[category].products;
    const suggestions = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 5);
    
    if (suggestions.length === 0) {
        hideCategorySuggestions(category);
        return;
    }
    
    const html = suggestions.map(product => `
        <div class="suggestion-item" onclick="selectProductFromSuggestion('${product.id}', '${product.name}')">
            <div class="suggestion-content">
                <div class="suggestion-name">${highlightMatch(product.name, query)}</div>
                ${product.brand ? `<div class="suggestion-brand-info">by ${highlightMatch(product.brand, query)}</div>` : ''}
            </div>
            <div class="suggestion-price">$${product.price}</div>
        </div>
    `).join('');
    
    suggestionsContainer.innerHTML = html;
    suggestionsContainer.style.display = 'block';
}

function hideCategorySuggestions(category) {
    setTimeout(() => {
        const suggestions = document.getElementById(`suggestions-${category}`);
        if (suggestions) {
            suggestions.style.display = 'none';
        }
    }, 200);
}

function showCustomProductForm() {
    const overlay = document.getElementById('customProductOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        clearCustomProductForm();
    }
}

// Setup search and filter functionality
function setupCatalogSearch() {
    const searchInput = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    // Clear any existing filters
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    
    updateResultCount();
}

function filterProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    let filteredProducts = {};
    let totalProductCount = 0;
    
    // Filter products based on search and category
    Object.keys(products).forEach(categoryName => {
        // Skip if category filter is active and doesn't match
        if (selectedCategory && categoryName !== selectedCategory) {
            return;
        }
        
        const categoryProducts = products[categoryName].items.filter(product => {
            const matchesSearch = !searchTerm || 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm);
            
            return matchesSearch;
        });
        
        if (categoryProducts.length > 0) {
            filteredProducts[categoryName] = {
                ...products[categoryName],
                items: categoryProducts
            };
            totalProductCount += categoryProducts.length;
        }
    });
    
    // Render filtered products
    renderFilteredProducts(filteredProducts, totalProductCount);
    updateResultCount(totalProductCount);
}

function renderFilteredProducts(filteredProducts, totalCount) {
    const catalogContainer = document.getElementById('productCatalog');
    
    if (Object.keys(filteredProducts).length === 0) {
        catalogContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #666;">
                <h3>No products found</h3>
                <p>Try adjusting your search terms or category filter.</p>
            </div>
        `;
        return;
    }
    
    catalogContainer.innerHTML = Object.keys(filteredProducts).map(categoryName => {
        const category = filteredProducts[categoryName];
        return `
            <div class="category-section">
                <div class="category-header">
                    <img src="${category.image}" alt="${categoryName}" class="category-image">
                    <h3 class="category-title">${categoryName} (${category.items.length})</h3>
                </div>
                <div class="products-grid">
                    ${category.items.map(product => `
                        <div class="product-card">
                            <div class="product-image-container">
                                <img src="${product.image}" alt="${product.name}" class="product-image">
                            </div>
                            <div class="product-info">
                                <h4 class="product-name">${product.name}</h4>
                                <p class="product-description">${product.description}</p>
                                <span class="default-price">Default: $${product.defaultPrice.toFixed(2)}</span>
                            </div>
                            <div class="product-controls">
                                <div class="controls-header">
                                    <h4>Add to Invoice</h4>
                                </div>
                                <div class="control-row">
                                    <label class="control-label">Qty:</label>
                                    <input type="number" class="control-input" value="1" min="1" id="qty-${product.id}">
                                </div>
                                <div class="control-row">
                                    <label class="control-label">Price:</label>
                                    <input type="number" class="control-input" value="${product.defaultPrice.toFixed(2)}" step="0.01" min="0" id="price-${product.id}">
                                </div>
                                <div class="total-row">
                                    <div class="total-display" id="total-${product.id}">
                                        Total: $${product.defaultPrice.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                            <button class="add-to-invoice-btn" onclick="addToInvoice('${product.id}', '${product.name}', '${product.description}', '${product.image}')">
                                ➕ Add to Invoice
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
    
    // Re-setup product control listeners
    setupProductControls();
}

function clearProductSearch() {
    document.getElementById('productSearch').value = '';
    document.getElementById('categoryFilter').value = '';
    filterProducts();
}

function updateResultCount(count) {
    const resultCountElement = document.getElementById('resultCount');
    if (resultCountElement) {
        if (count !== undefined) {
            resultCountElement.textContent = `${count} product${count !== 1 ? 's' : ''}`;
        } else {
            // Count all products
            const totalProducts = Object.values(products).reduce((sum, category) => sum + category.items.length, 0);
            resultCountElement.textContent = `${totalProducts} products`;
        }
    }
}

// Update product description
function updateProductDescription(productId, newDescription) {
    for (const category in productDatabase) {
        const product = productDatabase[category].products.find(p => p.id == productId);
        if (product) {
            product.description = newDescription.trim();
            break;
        }
    }
}

// Search products within a specific category
function searchCategoryProducts(category, searchTerm) {
    const categoryData = productDatabase[category];
    const grid = document.getElementById(`grid-${category}`);
    const countElement = document.getElementById(`count-${category}`);
    
    if (!categoryData || !grid || !countElement) return;
    
    const filteredProducts = categoryData.products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    // Update product grid
    grid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    
    // Update count
    countElement.textContent = `${filteredProducts.length} products`;
    
    // Show suggestions if search term exists
    if (searchTerm.trim()) {
        showCategorySuggestions(category, searchTerm);
    }
}

// Show search suggestions for a category
function showCategorySuggestions(category, searchTerm) {
    const suggestionsContainer = document.getElementById(`suggestions-${category}`);
    const categoryData = productDatabase[category];
    
    if (!suggestionsContainer || !categoryData || !searchTerm.trim()) {
        if (suggestionsContainer) suggestionsContainer.style.display = 'none';
        return;
    }
    
    // Get matching products
    const suggestions = categoryData.products
        .filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 suggestions
    
    if (suggestions.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }
    
    suggestionsContainer.innerHTML = suggestions.map(product => `
        <div class="suggestion-item" onclick="selectSuggestion('${category}', '${product.name.replace(/'/g, "\\'")}')">
            <div class="suggestion-name">${highlightMatch(product.name, searchTerm)}</div>
        </div>
    `).join('');
    
    suggestionsContainer.style.display = 'block';
}

// Hide suggestions for a category
function hideCategorySuggestions(category) {
    setTimeout(() => {
        const suggestionsContainer = document.getElementById(`suggestions-${category}`);
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
    }, 200); // Small delay to allow clicking on suggestions
}

// Select a suggestion
function selectSuggestion(category, productName) {
    const searchInput = document.getElementById(`search-${category}`);
    const suggestionsContainer = document.getElementById(`suggestions-${category}`);
    
    if (searchInput) {
        searchInput.value = productName;
        searchCategoryProducts(category, productName);
    }
    
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

// Highlight matching text in suggestions
function highlightMatch(text, searchTerm) {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}

// Clear category search
function clearCategorySearch(category) {
    const searchInput = document.getElementById(`search-${category}`);
    if (searchInput) {
        searchInput.value = '';
        searchCategoryProducts(category, '');
    }
    hideCategorySuggestions(category);
}


// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Toggle category dropdown with auto-close functionality
function toggleCategoryDropdown(category) {
    // Close all other dropdowns first
    Object.keys(productDatabase).forEach(cat => {
        if (cat !== category) {
            const container = document.getElementById(`products-${cat}`);
            const arrow = document.getElementById(`arrow-${cat}`);
            if (container) {
                container.style.display = 'none';
                if (arrow) arrow.innerHTML = '▼';
            }
        }
    });
    
    // Toggle the clicked category
    const container = document.getElementById(`products-${category}`);
    const arrow = document.getElementById(`arrow-${category}`);
    
    if (container && arrow) {
        if (container.style.display === 'none') {
            container.style.display = 'block';
            arrow.innerHTML = '▲';
        } else {
            container.style.display = 'none';
            arrow.innerHTML = '▼';
        }
    }
}

// Render the product catalog with collapsible dropdowns
function renderProductCatalog() {
    // Initialize search functionality
    initializeProductSearch();
    
    const catalog = document.getElementById('productCatalog');
    catalog.innerHTML = '';
    
    Object.keys(productDatabase).forEach(category => {
        const categoryData = productDatabase[category];
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';
        
        categorySection.innerHTML = `
            <div class="category-dropdown">
                <div class="category-header" onclick="toggleCategoryDropdown('${category}')">
                    <img src="${categoryData.categoryImage}" alt="${category}" class="category-image" 
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xMjUgNzVIMTc1VjEyNUgxMjVWNzVaIiBmaWxsPSIjREVERURFIi8+Cjwvc3ZnPgo='">
                    <div class="category-info">
                        <div class="category-title">${category}</div>
                        <div class="product-count">${categoryData.products.length} products</div>
                    </div>
                    <div class="dropdown-arrow" id="arrow-${category}">▲</div>
                </div>
                <div class="products-container" id="products-${category}" style="display: block;">
                    <!-- Search removed from each brand/category section as requested -->
                    <div class="products-grid scrollable" id="grid-${category}">
                        ${categoryData.products.map(product => createProductCard(product)).join('')}
                    </div>
                </div>
            </div>
        `;
        
        catalog.appendChild(categorySection);
    });
return convertToVisualBarcode(result);
}

// Create a product card
function createProductCard(product) {
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xNzUgMTAwSDIyNVYxNTBIMTc1VjEwMFoiIGZpbGw9IiNERURFREUiLz4KPHN2Zz4K'">
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand || 'Unknown Brand'}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="default-price">Price: $${product.defaultPrice.toFixed(2)}</div>
            </div>
            <div class="product-controls">
                <div class="controls-header">
                    <h4>Customize Order</h4>
                </div>
                <div class="control-row">
                    <label class="control-label">Quantity:</label>
                    <input type="number" class="control-input" id="qty-${product.id}" value="1" min="0.01" step="0.01" 
                           onchange="updateTotal(${product.id})" 
                           title="Enter quantity">
                </div>
                <div class="control-row">
                    <label class="control-label">Unit Price ($):</label>
                    <input type="number" class="control-input" id="price-${product.id}" value="${product.defaultPrice.toFixed(2)}" 
                           min="0" step="0.01" onchange="updateTotal(${product.id})" 
                           title="Enter custom price">
                </div>
                <div class="total-row">
                    <div class="total-display" id="total-${product.id}">
                        <strong>Total: $${product.defaultPrice.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
            <div class="product-action-buttons">
                <button class="edit-product-btn" onclick="editCatalogProductById(${product.id}); document.getElementById('editProductModal').style.display = 'block';">✏️ Edit</button>
                <button class="delete-product-btn" onclick="deleteCatalogProductById(${product.id})">🗑️ Delete</button>
                <button class="add-to-invoice-btn" onclick="confirmAddProduct(${product.id}, '${product.name.replace(/'/g, "\\'")}')">
                    📋 Add to Invoice
                </button>
            </div>
        </div>
    `;
}

// Show edit modal for product by id
function editCatalogProductById(productId) {
    for (const category in productDatabase) {
        const index = productDatabase[category].products.findIndex(p => p.id == productId);
        if (index !== -1) {
            editCatalogProduct(category, index);
            return;
        }
    }
    alert('Product not found!');
}

// Delete product by id (directly, no modal)
function deleteCatalogProductById(productId) {
    for (const category in productDatabase) {
        const index = productDatabase[category].products.findIndex(p => p.id == productId);
        if (index !== -1) {
            productDatabase[category].products.splice(index, 1);
            localStorage.setItem('productDatabase', JSON.stringify(productDatabase));
            renderProductCatalog();
            alert('Product deleted successfully!');
            return;
        }
    }
    alert('Product not found!');
}

// Update total for a product - Manual Calculation
function updateTotal(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const priceInput = document.getElementById(`price-${productId}`);
    const totalDisplay = document.getElementById(`total-${productId}`);
    
    const quantity = parseFloat(qtyInput.value) || 0;
    const price = parseFloat(priceInput.value) || 0;
    
    // Calculate total
    const total = quantity * price;
    
    // Update total display
    if (totalDisplay) {
        totalDisplay.classList.add('updating');
        totalDisplay.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
        setTimeout(() => totalDisplay.classList.remove('updating'), 200);
    }
    
    // Log calculation
    console.log(`� Product ${productId} calculated: ${quantity} × $${price.toFixed(2)} = $${total.toFixed(2)}`);
    
    // Enhanced visual feedback for input validation
    if (quantity <= 0) {
        qtyInput.style.borderColor = '#dc3545';
        qtyInput.style.backgroundColor = '#fff5f5';
        qtyInput.setAttribute('title', 'Quantity must be greater than 0');
    } else {
        qtyInput.style.borderColor = '#28a745';
        qtyInput.style.backgroundColor = '#f8fff8';
        qtyInput.setAttribute('title', 'Valid quantity');
    }
    
    if (price < 0) {
        priceInput.style.borderColor = '#dc3545';
        priceInput.style.backgroundColor = '#fff5f5';
        priceInput.setAttribute('title', 'Price cannot be negative');
    } else {
        priceInput.style.borderColor = '#28a745';
        priceInput.style.backgroundColor = '#f8fff8';
        priceInput.setAttribute('title', 'Valid price');
    }
    
    // Update total display color based on validity
    if (quantity > 0 && price >= 0) {
        totalDisplay.style.color = '#28a745';
        totalDisplay.style.backgroundColor = '#f8fff8';
    } else {
        totalDisplay.style.color = '#dc3545';
        totalDisplay.style.backgroundColor = '#fff5f5';
    }
}

// Confirm before adding product to invoice
function confirmAddProduct(productId, productName) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const priceInput = document.getElementById(`price-${productId}`);
    
    const quantity = parseFloat(qtyInput.value) || 0;
    const price = parseFloat(priceInput.value) || 0;
    const total = quantity * price;
    
    // Validate inputs
    if (quantity <= 0) {
        showValidationError('Please enter a valid quantity greater than 0', qtyInput);
        return;
    }
    
    if (price < 0) {
        showValidationError('Please enter a valid price (0 or greater)', priceInput);
        return;
    }
    
    // Show custom confirmation modal
    showConfirmationModal(productId, productName, quantity, price, total);
}

// Show validation error with visual feedback
function showValidationError(message, inputElement) {
    // Show alert
    alert('❌ ' + message);
    
    // Add visual feedback
    inputElement.style.borderColor = '#dc3545';
    inputElement.style.boxShadow = '0 0 5px rgba(220, 53, 69, 0.5)';
    inputElement.focus();
    
    // Remove error styling after 3 seconds
    setTimeout(() => {
        inputElement.style.borderColor = '#ddd';
        inputElement.style.boxShadow = 'none';
    }, 3000);
}

// Show confirmation modal
function showConfirmationModal(productId, productName, quantity, price, total) {
    // Find the product to get its image
    let productImage = '';
    for (const category in productDatabase) {
        const product = productDatabase[category].products.find(p => p.id == productId);
        if (product) {
            productImage = product.image;
            break;
        }
    }
    
    const confirmationHTML = `
        <div class="confirmation-modal" id="confirmationModal">
            <div class="confirmation-content">
                <div class="confirmation-header">
                    <h3>🔍 Double Check Before Adding</h3>
                    <button class="close-confirmation" onclick="closeConfirmationModal()">&times;</button>
                </div>
                
                <div class="confirmation-body">
                    <div class="confirmation-product">
                        <img src="${productImage}" alt="${productName}" class="confirmation-image"
                             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik00MCA0MEg2MFY2MEg0MFY0MFoiIGZpbGw9IiNERURFREUiLz4KPHN2Zz4K'">
                        <div class="confirmation-details">
                            <h4>${productName}</h4>
                            <div class="detail-row">
                                <span class="detail-label">Quantity:</span>
                                <span class="detail-value">${quantity}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Unit Price:</span>
                                <span class="detail-value">$${price.toFixed(2)}</span>
                            </div>
                            <div class="detail-row total-row">
                                <span class="detail-label">Total Amount:</span>
                                <span class="detail-value total-amount">$${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="confirmation-message">
                        <p>Are you sure you want to add this product to your invoice?</p>
                    </div>
                </div>
                
                <div class="confirmation-actions">
                    <button class="btn-cancel" onclick="closeConfirmationModal()">❌ Cancel</button>
                    <button class="btn-confirm" onclick="confirmAndAddProduct(${productId}, '${productName.replace(/'/g, "\\'\'")}', ${quantity}, ${price})">✅ Yes, Add to Invoice</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', confirmationHTML);
}

// Close confirmation modal
function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.remove();
    }
}

// Confirm and add product
function confirmAndAddProduct(productId, productName, quantity, price) {
    closeConfirmationModal();
    addProductToInvoiceDirectly(productId, productName, quantity, price);
}

// Add product directly to invoice (no page navigation)
function addProductToInvoiceDirectly(productId, productName, quantity, price) {
    const product = {
        name: productName,
        quantity: quantity,
        price: price,
        total: quantity * price
    };
    
    // Add the product to the invoice
    invoiceData.items.push(product);
    
    // Update the display
    renderInvoiceItems();
    updateSummary();
    
    // Hide the catalog and show success message
    toggleProductCatalog();
    
    // Show enhanced success message with better formatting
    showSuccessMessage(productName, quantity, price);
    
    // Scroll to the invoice table to show the new product
    setTimeout(() => {
        const invoiceTable = document.getElementById('invoiceTable');
        if (invoiceTable) {
            invoiceTable.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 500);
}

// Show success message
function showSuccessMessage(productName, quantity, price) {
    const successHTML = `
        <div class="success-modal" id="successModal">
            <div class="success-content">
                <div class="success-icon">✅</div>
                <h3>Product Added Successfully!</h3>
                <div class="success-details">
                    <p><strong>"${productName}"</strong> has been added to your invoice!</p>
                    <div class="success-summary">
                        <div>Quantity: <strong>${quantity}</strong></div>
                        <div>Price: <strong>$${price.toFixed(2)}</strong></div>
                        <div>Total: <strong>$${(quantity * price).toFixed(2)}</strong></div>
                    </div>
                    <p class="success-note">The product is now visible in your invoice table.</p>
                </div>
                <button class="success-close" onclick="closeSuccessModal()">Continue</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successHTML);
    
    // Auto-close after 4 seconds
    setTimeout(() => {
        closeSuccessModal();
    }, 4000);
}

// Close success modal
function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.remove();
    }
}

// Add custom product
function addCustomProduct() {
    const name = document.getElementById('customName').value.trim();
    const price = parseFloat(document.getElementById('customPrice').value) || 0;
    const description = document.getElementById('customDescription').value.trim();
    const quantity = parseFloat(document.getElementById('customQuantity').value) || 0;
    
    // Validate inputs
    if (!name) {
        alert('Please enter a product name');
        document.getElementById('customName').focus();
        return;
    }
    
    if (quantity <= 0) {
        alert('Please enter a valid quantity greater than 0');
        document.getElementById('customQuantity').focus();
        return;
    }
    
    if (price < 0) {
        alert('Please enter a valid price (0 or greater)');
        document.getElementById('customPrice').focus();
        return;
    }
    
    const total = quantity * price;
    
    // Double-check confirmation
    const confirmMessage = `
Please confirm the custom product details:

Product: ${name}
${description ? `Description: ${description}\n` : ''}Quantity: ${quantity}
Unit Price: $${price.toFixed(2)}
Total: $${total.toFixed(2)}

Add this custom product to your invoice?`;
    
    if (confirm(confirmMessage)) {
        const product = {
            id: Date.now(),
            name: name,
            description: description,
            quantity: quantity,
            price: price,
            total: total
        };
        
        // Add the product to the invoice
        invoiceData.items.push(product);
        
        // Update the display
        renderInvoiceItems();
        updateSummary();
        
        // Clear the form
        document.getElementById('customName').value = '';
        document.getElementById('customPrice').value = '';
        document.getElementById('customDescription').value = '';
        document.getElementById('customQuantity').value = '1';
        
        // Hide the catalog and show success message
        toggleProductCatalog();
        
        // Show enhanced success message
        alert(`✅ Custom Product Added!

"${name}" has been added to your invoice and is visible in the table above.`);
        
        // Scroll to the invoice table
        const invoiceTable = document.getElementById('invoiceTable');
        if (invoiceTable) {
            invoiceTable.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Toggle custom product form overlay
function toggleCustomProductForm() {
    const overlay = document.getElementById('customProductOverlay');
    if (overlay) {
        if (overlay.style.display === 'flex') {
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else {
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            clearCustomProductForm();
            
            // Focus on product name field
            setTimeout(() => {
                document.getElementById('productName').focus();
            }, 100);
        }
    }
}

// Clear custom product form
function clearCustomProductForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productQuantity').value = '1';
    document.getElementById('productPrice').value = '0';
    updateCustomProductDisplay();
    
    // Remove any error styling
    const inputs = document.querySelectorAll('#customProductOverlay input, #customProductOverlay select, #customProductOverlay textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
    });
}

// Update custom product display (manual calculations and preview)
function updateCustomProductDisplay() {
    const quantity = parseFloat(document.getElementById('productQuantity').value) || 0;
    const price = parseFloat(document.getElementById('productPrice').value) || 0;
    
    // Calculate total
    const total = quantity * price;
    
    // Update calculation display
    document.getElementById('displayQuantity').textContent = quantity;
    document.getElementById('displayPrice').textContent = `$${price.toFixed(2)}`;
    
    // Update total with animation
    const totalElement = document.getElementById('displayTotal');
    if (totalElement) {
        totalElement.classList.add('updating');
        totalElement.textContent = `$${total.toFixed(2)}`;
        setTimeout(() => totalElement.classList.remove('updating'), 200);
    }
    
    // Update preview
    const name = document.getElementById('productName').value || 'Product Name';
    const description = document.getElementById('productDescription').value || 'Product description will appear here';
    
    document.getElementById('previewName').textContent = name;
    document.getElementById('previewDescription').textContent = description;
    document.getElementById('previewQty').textContent = quantity;
    document.getElementById('previewPrice').textContent = `$${price.toFixed(2)}`;
    
    // Update preview total with animation
    const previewTotalElement = document.getElementById('previewTotal');
    if (previewTotalElement) {
        previewTotalElement.classList.add('updating');
        previewTotalElement.textContent = `$${total.toFixed(2)}`;
        setTimeout(() => previewTotalElement.classList.remove('updating'), 200);
    }
    
    // Visual feedback for valid calculations
    addCalculationValidationFeedback(quantity, price, total);
}

// Add visual feedback for calculation validation
function addCalculationValidationFeedback(quantity, price, total) {
    const quantityInput = document.getElementById('productQuantity');
    const priceInput = document.getElementById('productPrice');
    
    // Quantity validation feedback
    if (quantityInput) {
        if (quantity > 0) {
            quantityInput.style.borderColor = '#28a745';
            quantityInput.style.backgroundColor = '#f8fff8';
        } else {
            quantityInput.style.borderColor = '#ffc107';
            quantityInput.style.backgroundColor = '#fffbf0';
        }
    }
    
    // Price validation feedback  
    if (priceInput) {
        if (price >= 0) {
            priceInput.style.borderColor = '#28a745';
            priceInput.style.backgroundColor = '#f8fff8';
        } else {
            priceInput.style.borderColor = '#dc3545';
            priceInput.style.backgroundColor = '#fff5f5';
        }
    }
    
    // Log calculation for debugging
    if (quantity > 0 && price > 0) {
        console.log(`� Calculated: ${quantity} × $${price.toFixed(2)} = $${total.toFixed(2)}`);
    }
}

// Handle custom product form submission
function handleCustomProductSubmission(e) {
    e.preventDefault();
    
    const name = document.getElementById('productName').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const quantity = parseFloat(document.getElementById('productQuantity').value) || 0;
    const price = parseFloat(document.getElementById('productPrice').value) || 0;
    
    // Validation
    if (!name) {
        showFieldError('productName', 'Product name is required');
        return;
    }
    
    if (quantity <= 0) {
        showFieldError('productQuantity', 'Quantity must be greater than 0');
        return;
    }
    
    if (price < 0) {
        showFieldError('productPrice', 'Price cannot be negative');
        return;
    }
    
    // Create product object
    const product = {
        id: Date.now(),
        name: name,
        description: description || 'Custom product',
        quantity: quantity,
        price: price,
        total: quantity * price,
        category: 'Custom Products',
        isCustom: true
    };
    
    console.log('Creating custom product:', product); // Debug log
    
    // Add the product to the invoice
    invoiceData.items.push(product);
    
    // Update the display
    renderInvoiceItems();
    updateSummary();
    
    // Close the form
    toggleCustomProductForm();
    
    // Show success message
    showSuccessMessage(name, quantity, price);
    
    // Highlight the newly added item
    setTimeout(() => {
        highlightNewItems(1);
    }, 100);
}

// Show field error for validation
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.style.borderColor = '#dc3545';
        field.style.backgroundColor = '#fff5f5';
        field.setAttribute('title', message);
        
        // Show alert
        alert('❌ ' + message);
        field.focus();
        
        // Remove error styling after 3 seconds
        setTimeout(() => {
            field.style.borderColor = '';
            field.style.backgroundColor = '';
            field.removeAttribute('title');
        }, 3000);
    }
}

// Initialize custom product form when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for custom product form
    const quantityInput = document.getElementById('productQuantity');
    const priceInput = document.getElementById('productPrice');
    const nameInput = document.getElementById('productName');
    const descriptionTextarea = document.getElementById('productDescription');
    const customForm = document.getElementById('customProductForm');
    
    if (quantityInput) quantityInput.addEventListener('change', updateCustomProductDisplay);
    if (priceInput) priceInput.addEventListener('change', updateCustomProductDisplay);
    if (nameInput) nameInput.addEventListener('change', updateCustomProductDisplay);
    if (descriptionTextarea) descriptionTextarea.addEventListener('change', updateCustomProductDisplay);
    if (customForm) customForm.addEventListener('submit', handleCustomProductSubmission);
    
    // Initialize display
    updateCustomProductDisplay();
});







// Clear all saved invoices


// Invoice Storage Functions
function saveCurrentInvoice() {
    console.log('💾 Saving current invoice...');
    
    // Validation checks
    if (!invoiceData || !Array.isArray(invoiceData.items)) {
        console.error('❌ invoiceData not properly initialized');
        alert('Error: Invoice data not properly initialized. Please refresh the page.');
        return false;
    }
    
    if (invoiceData.items.length === 0) {
        console.warn('⚠️ Cannot save empty invoice');
        alert('Cannot save empty invoice. Please add some products first.');
        return false;
    }
    
    console.log('✅ Validation passed, creating invoice object...');
    
    const invoiceDate = document.getElementById('invoiceDate').value || new Date().toISOString().split('T')[0];
    const buyerName = document.getElementById('buyerName').value || 'Unknown Customer';
    const companyName = document.querySelector('.company-details h2')?.textContent || 'Day-Vy Cosmetics 241';
    
    // Calculate totals
    const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.total || 0), 0);
    const grandTotal = subtotal + (invoiceData.deliveryFee || 0);
    
    const savedInvoice = {
        id: (typeof editingInvoiceId !== 'undefined' && editingInvoiceId) ? editingInvoiceId : Date.now().toString(),
        date: invoiceDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        buyerName: buyerName,
        companyName: companyName,
        items: JSON.parse(JSON.stringify(invoiceData.items)), // Deep copy to avoid reference issues
        deliveryFee: invoiceData.deliveryFee || 0,
        subtotal: subtotal,
        total: grandTotal,
        itemCount: invoiceData.items.length,
        buyerInfo: {
            name: buyerName,
            phone: document.getElementById('buyerPhone')?.value || '',
            location: document.getElementById('buyerLocation')?.value || ''
        }
    };
    
    console.log('📋 Invoice object created:', savedInvoice);
    
    try {
        // Get existing saved invoices
        let savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
        console.log('📂 Current saved invoices:', savedInvoices.length);

        const isEditing = (typeof editingInvoiceId !== 'undefined' && editingInvoiceId);
        
        if (isEditing) {
            // Update existing invoice with same id
            const idx = savedInvoices.findIndex(inv => inv.id === editingInvoiceId);
            if (idx !== -1) {
                savedInvoices[idx] = savedInvoice;
                console.log('✏️ Updated existing invoice at index:', idx);
            } else {
                savedInvoices.unshift(savedInvoice);
                console.log('➕ Added invoice (editing ID not found)');
            }
            if (typeof window !== 'undefined') window.editingInvoiceId = null; // Clear editing state
        } else {
            // Add new invoice
            savedInvoices.unshift(savedInvoice);
            console.log('🆕 Added new invoice');
        }
        
        // Limit to 100 invoices to prevent storage overflow
        if (savedInvoices.length > 100) {
            savedInvoices = savedInvoices.slice(0, 100);
            console.log('🧹 Trimmed to 100 most recent invoices');
        }
        
        // Save to localStorage
        localStorage.setItem('savedInvoices', JSON.stringify(savedInvoices));
        console.log('💾 Invoice saved to localStorage successfully');
        
    } catch (error) {
        console.error('❌ Error saving invoice:', error);
        alert('Error saving invoice: ' + error.message);
        return false;
    }
    
    try {
        console.log('🔄 Starting display updates...');
        
        // Update display with specific error handling
        try {
            if (typeof displaySavedInvoices === 'function') {
                displaySavedInvoices();
                console.log('✅ Updated invoice display');
            } else {
                console.warn('⚠️ displaySavedInvoices function not available');
            }
        } catch (displayError) {
            console.error('❌ Error in displaySavedInvoices:', displayError);
            // Continue execution even if display update fails
        }
        
        // Update sidebar info with specific error handling
        try {
            if (typeof updateSidebarInfo === 'function') {
                updateSidebarInfo();
                console.log('✅ Updated sidebar info');
            } else {
                console.warn('⚠️ updateSidebarInfo function not available');
            }
        } catch (sidebarError) {
            console.error('❌ Error in updateSidebarInfo:', sidebarError);
            // Continue execution even if sidebar update fails
        }
        
        // Update customer stats if available
        try {
            if (typeof updateCustomerStats === 'function') {
                updateCustomerStats();
                console.log('✅ Updated customer stats');
            }
        } catch (customerError) {
            console.error('❌ Error in updateCustomerStats:', customerError);
            // Continue execution even if customer stats update fails
        }
        
        // Show success message
        const successMessage = `✅ Invoice saved successfully!\n📋 Invoice ID: ${savedInvoice.id}\n👤 Customer: ${buyerName}\n💰 Total: $${grandTotal.toFixed(2)}\n📦 Items: ${invoiceData.items.length}`;
        alert(successMessage);
        
        console.log('🎉 Invoice save operation completed successfully');
        return true;
        
    } catch (error) {
        console.error('❌ Critical error in save process:', error);
        alert(`Invoice saved successfully but encountered a display error: ${error.message}\nYour invoice data is safe. Refreshing the page will fix the display.`);
        return false;
    }
}

// Load a saved invoice into the main form for editing
function loadInvoiceForEdit(invoiceId) {
    const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    const invoice = savedInvoices.find(inv => inv.id === invoiceId);
    if (!invoice) {
        alert('Invoice not found');
        return;
    }

    // Set editing id so save will update instead of creating a new one
    editingInvoiceId = invoice.id;

    // Clear current invoice
    clearInvoice();

    // Load invoice data into invoiceData
    invoiceData.items = [...invoice.items];
    invoiceData.deliveryFee = invoice.deliveryFee || 0.00;

    // Populate form fields
    document.getElementById('invoiceDate').value = invoice.date || new Date().toISOString().split('T')[0];
    document.getElementById('buyerName').value = invoice.buyerInfo?.name || '';
    document.getElementById('buyerPhone').value = invoice.buyerInfo?.phone || '';
    document.getElementById('buyerLocation').value = invoice.buyerInfo?.location || '';

    // Update UI
    renderInvoiceItems();
    updateSummary();

    // Bring user attention
    alert('Invoice loaded for editing. Make your changes and click Save to update.');
}

function cleanOldInvoices(invoices) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    return invoices.filter(invoice => {
        const invoiceDate = new Date(invoice.createdAt);
        return invoiceDate > oneMonthAgo;
    });
}

function displaySavedInvoices() {
    const historyContainer = document.getElementById('invoiceHistory');
    let savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    
    // Clean old invoices automatically
    savedInvoices = cleanOldInvoices(savedInvoices);
    localStorage.setItem('savedInvoices', JSON.stringify(savedInvoices));
    
    // Update search info
    updateInvoiceSearchInfo(`${savedInvoices.length} invoice(s)`);
    
    if (savedInvoices.length === 0) {
        historyContainer.innerHTML = '<p style="font-size: 0.8rem; opacity: 0.7; text-align: center; margin: 1rem 0;">No saved invoices</p>';
        updateInvoiceSearchInfo('No invoices');
        return;
    }
    
    historyContainer.innerHTML = savedInvoices.map(invoice => {
        const invoiceDate = new Date(invoice.createdAt);
        const isExpiring = isInvoiceExpiring(invoiceDate);
        const daysLeft = getDaysUntilExpiry(invoiceDate);
        
        return `
            <div class="saved-invoice ${isExpiring ? 'invoice-expired' : ''}" onclick="loadSavedInvoice('${invoice.id}')">
                <div class="saved-invoice-header">
                    <span class="saved-invoice-date">${convertISOToDDMMYYYY(invoice.date)}</span>
                    <div class="saved-invoice-actions">
                        <button class="invoice-action-btn" onclick="event.stopPropagation(); loadInvoiceForEdit('${invoice.id}')" title="Edit">✏️</button>
                        <button class="invoice-action-btn" onclick="event.stopPropagation(); deleteSavedInvoice('${invoice.id}')" title="Delete">🗑️</button>
                        <button class="invoice-action-btn" onclick="event.stopPropagation(); duplicateSavedInvoice('${invoice.id}')" title="Duplicate">📋</button>
                    </div>
                </div>
                <div class="saved-invoice-info">
                    <p><strong>${invoice.buyerName}</strong></p>
                    <p>${invoice.items.length} products - $${invoice.total.toFixed(2)}</p>
                    <p style="font-size: 0.7rem; opacity: 0.8;">
                        ${isExpiring ? `Expires in ${daysLeft} days` : `Saved ${getRelativeTime(invoiceDate)}`}
                    </p>
                </div>
            </div>
        `;
    }).join('');
}

function isInvoiceExpiring(createdDate) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const threeDaysFromExpiry = new Date(oneMonthAgo);
    threeDaysFromExpiry.setDate(threeDaysFromExpiry.getDate() + 3);
    
    return createdDate < threeDaysFromExpiry;
}

function getDaysUntilExpiry(createdDate) {
    const expiryDate = new Date(createdDate);
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    const today = new Date();
    const diffTime = expiryDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}

// Convert ISO date string to DD/MM/YYYY format
function convertISOToDDMMYYYY(isoString) {
    try {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } catch (error) {
        console.error('Error converting date:', error);
        return 'Invalid Date';
    }
}

// Clean old invoices (older than 1 month)
function cleanOldInvoices(invoices) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    return invoices.filter(invoice => {
        const invoiceDate = new Date(invoice.createdAt);
        return invoiceDate > oneMonthAgo;
    });
}

// Update invoice search info
function updateInvoiceSearchInfo(message) {
    const infoElement = document.getElementById('invoiceSearchInfo');
    if (infoElement) {
        infoElement.textContent = message;
    }
}

function loadSavedInvoice(invoiceId) {
    const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    const invoice = savedInvoices.find(inv => inv.id === invoiceId);
    
    if (!invoice) {
        alert('Invoice not found');
        return;
    }
    
    // Clear current invoice
    clearInvoice();
    
    // Load invoice data
    invoiceData.items = [...invoice.items];
    invoiceData.deliveryFee = invoice.deliveryFee;
    
    // Update form fields
    document.getElementById('invoiceDate').value = invoice.date;
    document.getElementById('buyerName').value = invoice.buyerInfo.name;
    document.getElementById('buyerPhone').value = invoice.buyerInfo.phone;
    document.getElementById('buyerLocation').value = invoice.buyerInfo.location;
    
    // Update date display
    updateDateDisplay();
    
    // Re-render the invoice
    renderInvoiceItems();
    updateSummary();
    
    alert('Invoice loaded successfully!');
}

function deleteSavedInvoice(invoiceId) {
    if (!confirm('Are you sure you want to delete this invoice?')) {
        return;
    }
    
    let savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    savedInvoices = savedInvoices.filter(inv => inv.id !== invoiceId);
    localStorage.setItem('savedInvoices', JSON.stringify(savedInvoices));
    displaySavedInvoices();
}

function duplicateSavedInvoice(invoiceId) {
    const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    const invoice = savedInvoices.find(inv => inv.id === invoiceId);
    
    if (!invoice) {
        alert('Invoice not found');
        return;
    }
    
    // Create a duplicate with new ID and current date
    const duplicate = {
        ...invoice,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
    };
    
    // Add to saved invoices
    const updatedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    updatedInvoices.unshift(duplicate);
    localStorage.setItem('savedInvoices', JSON.stringify(updatedInvoices));
    
    displaySavedInvoices();
    alert('Invoice duplicated successfully!');
}

// Invoice Date Filtering Functions
function filterInvoicesByDate() {
    const selectedDate = document.getElementById('invoiceDateSearch').value;
    
    if (!selectedDate) {
        displaySavedInvoices();
        updateInvoiceSearchInfo('All invoices');
        return;
    }
    
    const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    const filteredInvoices = savedInvoices.filter(invoice => {
        return invoice.date === selectedDate;
    });
    
    displayFilteredInvoices(filteredInvoices);
    updateInvoiceSearchInfo(`${filteredInvoices.length} invoice(s) for ${formatDisplayDate(selectedDate)}`);
}

function clearDateFilter() {
    document.getElementById('invoiceDateSearch').value = '';
    displaySavedInvoices();
    updateInvoiceSearchInfo('All invoices');
}

function displayFilteredInvoices(filteredInvoices) {
    const historyContainer = document.getElementById('invoiceHistory');
    
    if (filteredInvoices.length === 0) {
        historyContainer.innerHTML = '<div class="no-invoices">No invoices found for the selected date.</div>';
        return;
    }
    
    historyContainer.innerHTML = '';
    
    filteredInvoices.forEach(invoice => {
        const createdDate = new Date(invoice.createdAt);
        const isExpiring = isInvoiceExpiring(createdDate);
        const daysUntilExpiry = getDaysUntilExpiry(createdDate);
        
        const invoiceCard = document.createElement('div');
        invoiceCard.className = `saved-invoice ${isExpiring ? 'expiring' : ''}`;
        
        invoiceCard.innerHTML = `
            <div class="saved-invoice-header">
                <div class="saved-invoice-date">${convertISOToDDMMYYYY(invoice.date)}</div>
                <div class="saved-invoice-actions">
                    <button onclick="loadInvoiceForEdit('${invoice.id}')" title="Edit Invoice">✏️</button>
                    <button onclick="duplicateSavedInvoice('${invoice.id}')" title="Duplicate Invoice">📋</button>
                    <button onclick="deleteSavedInvoice('${invoice.id}')" title="Delete Invoice" class="delete-btn">🗑️</button>
                </div>
            </div>
            <div class="saved-invoice-info">
                <div><strong>Buyer:</strong> ${invoice.buyerName}</div>
                <div><strong>Items:</strong> ${invoice.items.length}</div>
                <div><strong>Total:</strong> $${invoice.total.toFixed(2)}</div>
                <div class="invoice-expiry ${isExpiring ? 'warning' : ''}">
                    Expires in ${daysUntilExpiry} days (${getRelativeTime(createdDate)})
                </div>
            </div>
        `;
        
        historyContainer.appendChild(invoiceCard);
    });
}

function updateInvoiceSearchInfo(text) {
    document.getElementById('invoiceResultCount').textContent = text;
}

function formatDisplayDate(dateStr) {
    return formatDateToDDMMYYYY(dateStr);
}

// Auto-cleanup function (run on page load)
function autoCleanupInvoices() {
    let savedInvoices = JSON.parse(localStorage.getItem('savedInvoices') || '[]');
    const originalLength = savedInvoices.length;
    
    savedInvoices = cleanOldInvoices(savedInvoices);
    localStorage.setItem('savedInvoices', JSON.stringify(savedInvoices));
    
    if (originalLength > savedInvoices.length) {
        console.log(`Automatically cleaned ${originalLength - savedInvoices.length} expired invoices`);
    }
    
    displaySavedInvoices();
}

// Customer Storage Functions
function saveCurrentCustomer() {
    const customerName = document.getElementById('buyerName').value.trim();
    const customerPhone = document.getElementById('buyerPhone').value.trim();
    const customerLocation = document.getElementById('buyerLocation').value.trim();
    
    if (!customerName && !customerPhone && !customerLocation) {
        alert('Please fill in at least one customer field (Name, Phone, or Location) before saving.');
        return;
    }
    
    const customer = {
        id: Date.now().toString(),
        name: customerName || 'Unknown Customer',
        phone: customerPhone || '',
        location: customerLocation || '',
        createdAt: new Date().toISOString(),
        lastUsed: new Date().toISOString()
    };
    
    // Get existing saved customers
    let savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    
    // Check if customer already exists (by name or phone)
    const existingCustomerIndex = savedCustomers.findIndex(c => 
        (c.name === customer.name && customer.name !== 'Unknown Customer') ||
        (c.phone === customer.phone && customer.phone !== '')
    );
    
    if (existingCustomerIndex !== -1) {
        // Update existing customer
        savedCustomers[existingCustomerIndex] = {
            ...savedCustomers[existingCustomerIndex],
            name: customer.name,
            phone: customer.phone,
            location: customer.location,
            lastUsed: customer.lastUsed
        };
        alert('Customer information updated successfully!');
    } else {
        // Add new customer
        savedCustomers.unshift(customer);
        alert('Customer saved successfully!');
    }
    
    // Limit to 50 customers to prevent storage overflow
    if (savedCustomers.length > 50) {
        savedCustomers = savedCustomers.slice(0, 50);
    }
    
    // Save to localStorage
    localStorage.setItem('savedCustomers', JSON.stringify(savedCustomers));
    
    // Update display and dropdown
    displaySavedCustomers();
    populateCustomerDropdown();
    
    // Export customer database to file
    exportCustomerDatabaseToFile();
}

// Export customer database to JSON file
function exportCustomerDatabaseToFile() {
    try {
        const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
        const exportData = {
            exportDate: new Date().toISOString(),
            totalCustomers: savedCustomers.length,
            customers: savedCustomers
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `customer_database_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('✅ Customer database exported successfully');
    } catch (error) {
        console.error('❌ Error exporting customer database:', error);
    }
}

// Manual export trigger
function downloadCustomerDatabase() {
    try {
        const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
        
        if (savedCustomers.length === 0) {
            alert('No customers to export. Please add customers first.');
            return;
        }
        
        const exportData = {
            exportDate: new Date().toISOString(),
            totalCustomers: savedCustomers.length,
            version: '1.0',
            customers: savedCustomers
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `customer_database_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert(`Successfully exported ${savedCustomers.length} customers to file!`);
        console.log('✅ Customer database downloaded:', savedCustomers.length, 'customers');
    } catch (error) {
        console.error('❌ Error downloading customer database:', error);
        alert('Error exporting customer database. Please try again.');
    }
}

// Import customer database from JSON file
function importCustomerDatabase() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importData = JSON.parse(event.target.result);
                
                // Validate import data
                if (!importData.customers || !Array.isArray(importData.customers)) {
                    alert('Invalid customer database file format.');
                    return;
                }
                
                const existingCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
                const importedCustomers = importData.customers;
                
                // Ask user how to handle import
                const action = confirm(
                    `Found ${importedCustomers.length} customers in file.\n\n` +
                    `You currently have ${existingCustomers.length} customers.\n\n` +
                    `Click OK to MERGE (add new customers)\n` +
                    `Click Cancel to REPLACE (delete existing and import)`
                );
                
                let finalCustomers;
                if (action) {
                    // Merge - add customers that don't exist
                    finalCustomers = [...existingCustomers];
                    let addedCount = 0;
                    
                    importedCustomers.forEach(imported => {
                        const exists = finalCustomers.find(c => 
                            c.name === imported.name || c.phone === imported.phone
                        );
                        if (!exists) {
                            finalCustomers.push(imported);
                            addedCount++;
                        }
                    });
                    
                    alert(`Import complete! Added ${addedCount} new customers.\nTotal customers: ${finalCustomers.length}`);
                } else {
                    // Replace - use imported customers only
                    finalCustomers = importedCustomers;
                    alert(`Database replaced! Imported ${finalCustomers.length} customers.`);
                }
                
                // Save to localStorage
                localStorage.setItem('savedCustomers', JSON.stringify(finalCustomers));
                
                // Refresh display
                displaySavedCustomers();
                populateCustomerDropdown();
                updateCustomerStats();
                
                console.log('✅ Customer database imported successfully:', finalCustomers.length, 'customers');
            } catch (error) {
                console.error('❌ Error importing customer database:', error);
                alert('Error reading customer database file. Please ensure it is a valid JSON file.');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// Clear all customer database
function clearCustomerDatabase() {
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    
    if (savedCustomers.length === 0) {
        alert('Customer database is already empty.');
        return;
    }
    
    if (confirm(`Are you sure you want to delete all ${savedCustomers.length} customers?\n\nThis action cannot be undone!`)) {
        if (confirm('⚠️ FINAL WARNING: This will permanently delete all customer data!\n\nClick OK to proceed with deletion.')) {
            localStorage.setItem('savedCustomers', '[]');
            displaySavedCustomers();
            populateCustomerDropdown();
            updateCustomerStats();
            alert('Customer database cleared successfully!');
            console.log('🗑️ Customer database cleared');
        }
    }
}

function updateCustomerStats() {
    try {
        const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
        const totalElement = document.getElementById('totalCustomers');
        
        if (totalElement) {
            totalElement.textContent = savedCustomers.length;
            console.log('📊 Updated customer count display:', savedCustomers.length);
        }
        
        // Update other customer statistics if elements exist
        const recentCustomers = savedCustomers.filter(c => {
            const lastUsed = new Date(c.lastUsed || 0);
            const daysDiff = (new Date() - lastUsed) / (1000 * 60 * 60 * 24);
            return daysDiff <= 30; // Within last 30 days
        });
        
        console.log('📈 Customer stats updated:', {
            total: savedCustomers.length,
            recent: recentCustomers.length
        });
        
    } catch (error) {
        console.error('❌ Error updating customer stats:', error);
    }
}

function displaySavedCustomers() {
    console.log('👥 Displaying saved customers...');
    
    const historyContainer = document.getElementById('customerHistory');
    if (!historyContainer) {
        console.error('❌ Customer history container not found');
        return;
    }
    
    let savedCustomers = [];
    try {
        savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
        console.log('✅ Loaded', savedCustomers.length, 'saved customers');
    } catch (error) {
        console.error('❌ Error loading customer data:', error);
        savedCustomers = [];
    }
    
    // Update customer statistics
    updateCustomerStats();
    
    if (savedCustomers.length === 0) {
        historyContainer.innerHTML = '<p style="font-size: 0.8rem; opacity: 0.7; text-align: center; margin: 1rem 0; padding: 1rem; background: #f8f9fa; border-radius: 6px;">👥 No saved customers yet<br><small>Use "👤 Save Current Customer" to add customers</small></p>';
        console.log('📝 Showing empty customer message');
        return;
    }
    
    // Sort by last used (most recent first)
    savedCustomers.sort((a, b) => new Date(b.lastUsed || 0) - new Date(a.lastUsed || 0));
    console.log('📋 Sorted customers by most recent usage');
    
    historyContainer.innerHTML = savedCustomers.map((customer, index) => {
        const lastUsed = customer.lastUsed ? new Date(customer.lastUsed) : new Date();
        const phoneDisplay = customer.phone ? `📞 ${customer.phone}` : '';
        const locationDisplay = customer.location ? `📍 ${customer.location}` : '';
        const customerName = customer.name || 'Unknown Customer';
        
        return `
            <div class="saved-customer" onclick="loadSavedCustomer('${customer.id}')" style="
                background: ${index % 2 === 0 ? '#f8f9fa' : 'white'};
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 0.75rem;
                margin-bottom: 0.5rem;
                cursor: pointer;
                transition: all 0.2s ease;
                position: relative;
            " onmouseover="this.style.background='#e3f2fd'; this.style.transform='translateY(-1px)'" 
               onmouseout="this.style.background='${index % 2 === 0 ? '#f8f9fa' : 'white'}'; this.style.transform='translateY(0)'">
                
                <div class="saved-customer-header" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                ">
                    <span class="saved-customer-name" style="
                        font-weight: 600;
                        color: #2c3e50;
                        font-size: 0.9rem;
                    ">${customerName}</span>
                    
                    <div class="saved-customer-actions" style="display: flex; gap: 0.25rem;">
                        <button class="customer-action-btn" onclick="event.stopPropagation(); loadSavedCustomer('${customer.id}')" title="Use Customer" style="
                            background: #28a745;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            padding: 4px 8px;
                            font-size: 0.7rem;
                            cursor: pointer;
                        ">� Use</button>
                        <button class="customer-action-btn" onclick="event.stopPropagation(); deleteSavedCustomer('${customer.id}')" title="Delete" style="
                            background: #dc3545;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            padding: 4px 8px;
                            font-size: 0.7rem;
                            cursor: pointer;
                        ">🗑️</button>
                    </div>
                </div>
                
                <div class="saved-customer-info" style="font-size: 0.8rem; color: #6c757d;">
                    ${phoneDisplay ? `<p style="margin: 0.2rem 0;">${phoneDisplay}</p>` : ''}
                    ${locationDisplay ? `<p style="margin: 0.2rem 0;">${locationDisplay}</p>` : ''}
                    <p style="font-size: 0.7rem; opacity: 0.8; margin: 0.2rem 0;">
                        Last used: ${lastUsed.toLocaleDateString()} ${lastUsed.toLocaleTimeString()}
                    </p>
                </div>
            </div>
        `;
    }).join('');
    
    console.log('✅ Customer display updated with', savedCustomers.length, 'customers');
}

function loadSavedCustomer(customerId) {
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    const customer = savedCustomers.find(c => c.id === customerId);
    
    if (!customer) {
        alert('Customer not found');
        return;
    }
    
    // Load customer data into form
    document.getElementById('buyerName').value = customer.name !== 'Unknown Customer' ? customer.name : '';
    document.getElementById('buyerPhone').value = customer.phone;
    document.getElementById('buyerLocation').value = customer.location;
    
    // Update last used timestamp
    customer.lastUsed = new Date().toISOString();
    const updatedCustomers = savedCustomers.map(c => c.id === customerId ? customer : c);
    localStorage.setItem('savedCustomers', JSON.stringify(updatedCustomers));
    
    // Refresh display
    displaySavedCustomers();
    
    alert('Customer information loaded successfully!');
}

function deleteSavedCustomer(customerId) {
    if (!confirm('Are you sure you want to delete this customer?')) {
        return;
    }
    
    let savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    savedCustomers = savedCustomers.filter(c => c.id !== customerId);
    localStorage.setItem('savedCustomers', JSON.stringify(savedCustomers));
    displaySavedCustomers();
    
    alert('Customer deleted successfully!');
}

function editSavedCustomer(customerId) {
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    const customer = savedCustomers.find(c => c.id === customerId);
    
    if (!customer) {
        alert('Customer not found');
        return;
    }
    
    // Load customer into form for editing
    loadSavedCustomer(customerId);
    
    // Scroll to buyer information section
    const buyerInfo = document.querySelector('.buyer-info');
    if (buyerInfo) {
        buyerInfo.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    alert('Customer loaded for editing. Make your changes and save again to update.');
}

function searchCustomers(searchTerm) {
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    const filteredCustomers = savedCustomers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Update display with filtered results
    const historyContainer = document.getElementById('customerHistory');
    if (filteredCustomers.length === 0) {
        historyContainer.innerHTML = '<p style="font-size: 0.8rem; opacity: 0.7; text-align: center; margin: 1rem 0;">No customers found</p>';
        return;
    }
    
    // Display filtered customers (reuse existing display logic)
    // This function could be expanded to show search results
}

// Customer Selection Functions
function populateCustomerDropdown() {
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    const customerSelect = document.getElementById('customerSelect');
    
    // Update customer statistics
    updateCustomerStats();
    
    // Clear existing options except the first one
    customerSelect.innerHTML = '<option value="">-- Select from database --</option>';
    
    // Add customer options
    savedCustomers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = `${customer.name}${customer.phone ? ' - ' + customer.phone : ''}`;
        customerSelect.appendChild(option);
    });
}

function loadSelectedCustomer() {
    const customerSelect = document.getElementById('customerSelect');
    const selectedCustomerId = customerSelect.value;
    
    if (!selectedCustomerId) {
        clearCustomerFields();
        return;
    }
    
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    const selectedCustomer = savedCustomers.find(c => c.id === selectedCustomerId);
    
    if (selectedCustomer) {
        document.getElementById('buyerName').value = selectedCustomer.name || '';
        document.getElementById('buyerPhone').value = selectedCustomer.phone || '';
        document.getElementById('buyerLocation').value = selectedCustomer.location || '';
        
        // Update last used date
        selectedCustomer.lastUsed = new Date().toISOString();
        localStorage.setItem('savedCustomers', JSON.stringify(savedCustomers));
    }
}

function clearCustomerFields() {
    document.getElementById('customerSelect').value = '';
    document.getElementById('buyerName').value = '';
    document.getElementById('buyerPhone').value = '';
    document.getElementById('buyerLocation').value = '';
}

function clearAllBuyerInfo() {
    if (confirm('Are you sure you want to clear all buyer information?')) {
        document.getElementById('customerSearchField').value = '';
        document.getElementById('buyerName').value = '';
        document.getElementById('buyerPhone').value = '';
        document.getElementById('buyerLocation').value = '';
    }
}

// Buyer Name Print Toggle Function
function toggleBuyerNamePrint() {
    const toggleBtn = document.getElementById('buyerNameToggle');
    const currentState = localStorage.getItem('showBuyerNameOnPrint') !== 'false'; // Default to true

    if (currentState) {
        // Currently showing, switch to hiding
        localStorage.setItem('showBuyerNameOnPrint', 'false');
        toggleBtn.innerHTML = '🙈 Hide on Print';
        toggleBtn.title = 'Buyer name will NOT appear on printed invoice';
        console.log('🚫 Buyer name will be hidden on print');
    } else {
        // Currently hiding, switch to showing
        localStorage.setItem('showBuyerNameOnPrint', 'true');
        toggleBtn.innerHTML = '👁️ Show on Print';
        toggleBtn.title = 'Buyer name will appear on printed invoice';
        console.log('✅ Buyer name will be shown on print');
    }
}

// Restore buyer name print preference on page load
function restoreBuyerNamePrintState() {
    const showOnPrint = localStorage.getItem('showBuyerNameOnPrint');
    const toggleBtn = document.getElementById('buyerNameToggle');

    if (!toggleBtn) {
        console.warn('⚠️ Buyer name toggle button not found');
        return;
    }

    if (showOnPrint === 'false') {
        // Hide buyer name on print
        toggleBtn.innerHTML = '🙈 Hide on Print';
        toggleBtn.title = 'Buyer name will NOT appear on printed invoice';
        console.log('🔄 Restored: Buyer name hidden on print');
    } else {
        // Show buyer name on print (default)
        toggleBtn.innerHTML = '👁️ Show on Print';
        toggleBtn.title = 'Buyer name will appear on printed invoice';
        console.log('🔄 Restored: Buyer name shown on print');
    }
}

// Buyer Customer Search Functions
function searchCustomersInBuyer(searchTerm) {
    const suggestionsContainer = document.getElementById('buyerCustomerSuggestions');
    
    if (!searchTerm || searchTerm.trim().length === 0) {
        showBuyerCustomerSuggestions(); // Show recent customers
        return;
    }
    
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    const matchingCustomers = savedCustomers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Display matching customers
    displayBuyerCustomerSuggestions(matchingCustomers, searchTerm);
    
    // Show suggestions container
    suggestionsContainer.classList.add('show');
}

function showBuyerCustomerSuggestions() {
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    
    // Sort by last used (most recent first) and get top 5
    const recentCustomers = savedCustomers
        .sort((a, b) => new Date(b.lastUsed || 0) - new Date(a.lastUsed || 0))
        .slice(0, 5);
    
    displayBuyerCustomerSuggestions(recentCustomers, '');
    
    const suggestionsContainer = document.getElementById('buyerCustomerSuggestions');
    suggestionsContainer.classList.add('show');
}

function hideBuyerCustomerSuggestions() {
    // Delay hiding to allow click events
    setTimeout(() => {
        const suggestionsContainer = document.getElementById('buyerCustomerSuggestions');
        if (suggestionsContainer) {
            suggestionsContainer.classList.remove('show');
        }
    }, 150);
}

function displayBuyerCustomerSuggestions(customers, searchTerm) {
    const suggestionsContainer = document.getElementById('buyerCustomerSuggestions');
    
    if (customers.length === 0) {
        suggestionsContainer.innerHTML = `
            <div class="suggestion-header">${searchTerm ? 'Search Results' : 'Recent Customers'}</div>
            <div class="no-customers-found">
                ${searchTerm ? `No customers found for "${searchTerm}"` : 'No customers saved yet'}
            </div>
        `;
        return;
    }
    
    const headerText = searchTerm ? `Search Results (${customers.length})` : 'Recent Customers';
    
    suggestionsContainer.innerHTML = `
        <div class="suggestion-header">${headerText}</div>
        ${customers.map(customer => `
            <div class="customer-suggestion-item" onclick="selectBuyerCustomer('${customer.id}')">
                <div class="customer-name">${highlightMatch(customer.name, searchTerm)}</div>
                <div class="customer-details">
                    ${customer.phone ? `<span class="customer-phone">📞 ${highlightMatch(customer.phone, searchTerm)}</span>` : ''}
                    ${customer.location ? `<span class="customer-location">📍 ${highlightMatch(customer.location, searchTerm)}</span>` : ''}
                </div>
            </div>
        `).join('')}
    `;
}

function selectBuyerCustomer(customerId) {
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    const selectedCustomer = savedCustomers.find(c => c.id === customerId);
    
    if (selectedCustomer) {
        // Fill the buyer fields
        document.getElementById('customerSearchField').value = selectedCustomer.name;
        document.getElementById('buyerName').value = selectedCustomer.name || '';
        document.getElementById('buyerPhone').value = selectedCustomer.phone || '';
        document.getElementById('buyerLocation').value = selectedCustomer.location || '';
        
        // Update last used date
        selectedCustomer.lastUsed = new Date().toISOString();
        localStorage.setItem('savedCustomers', JSON.stringify(savedCustomers));
        
        // Hide suggestions
        hideBuyerCustomerSuggestions();
        
        // Show a brief confirmation
        showCustomerSelectedNotification(selectedCustomer.name);
    }
}

function highlightMatch(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function showCustomerSelectedNotification(customerName) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        padding: 0.75rem 1.25rem;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        font-size: 0.9rem;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="font-weight: 600;">✅ Customer Selected</div>
        <div style="opacity: 0.9; margin-top: 0.25rem;">${customerName}</div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

// Customer Search Functions
function searchCustomers() {
    const searchTerm = document.getElementById('customerSearchInput').value.trim().toLowerCase();
    const suggestionsContainer = document.getElementById('customerSuggestions');
    
    if (searchTerm.length === 0) {
        hideSuggestions();
        displaySavedCustomers(); // Show all customers
        return;
    }
    
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    const matchingCustomers = savedCustomers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.phone.toLowerCase().includes(searchTerm) ||
        customer.location.toLowerCase().includes(searchTerm)
    );
    
    // Show suggestions
    showCustomerSuggestions(matchingCustomers);
    
    // Filter displayed customers
    filterCustomerDisplay(matchingCustomers);
}

function showCustomerSuggestions(customers) {
    const suggestionsContainer = document.getElementById('customerSuggestions');
    
    if (customers.length === 0) {
        suggestionsContainer.innerHTML = '<div class="customer-suggestion">No customers found</div>';
    } else {
        suggestionsContainer.innerHTML = customers.slice(0, 5).map(customer => {
            const phoneDisplay = customer.phone ? ` • ${customer.phone}` : '';
            const locationDisplay = customer.location ? ` • ${customer.location}` : '';
            
            return `
                <div class="customer-suggestion" onclick="selectCustomerFromSuggestion('${customer.id}')">
                    <div class="suggestion-name">${customer.name}</div>
                    <div class="suggestion-details">${phoneDisplay}${locationDisplay}</div>
                </div>
            `;
        }).join('');
    }
    
    suggestionsContainer.style.display = 'block';
}

function hideSuggestions() {
    document.getElementById('customerSuggestions').style.display = 'none';
}

function hideCustomerSuggestions() {
    // Delay hiding to allow click events to process
    setTimeout(() => {
        hideSuggestions();
    }, 200);
}

function selectCustomerFromSuggestion(customerId) {
    const savedCustomers = JSON.parse(localStorage.getItem('savedCustomers') || '[]');
    const selectedCustomer = savedCustomers.find(c => c.id === customerId);
    
    if (selectedCustomer) {
        // Load customer into buyer fields
        document.getElementById('customerSelect').value = customerId;
        document.getElementById('buyerName').value = selectedCustomer.name || '';
        document.getElementById('buyerPhone').value = selectedCustomer.phone || '';
        document.getElementById('buyerLocation').value = selectedCustomer.location || '';
        
        // Update last used date
        selectedCustomer.lastUsed = new Date().toISOString();
        localStorage.setItem('savedCustomers', JSON.stringify(savedCustomers));
        
        // Clear search and hide suggestions
        document.getElementById('customerSearchInput').value = '';
        hideSuggestions();
        
        // Reset customer display
        displaySavedCustomers();
    }
}

function filterCustomerDisplay(filteredCustomers) {
    const historyContainer = document.getElementById('customerHistory');
    
    if (filteredCustomers.length === 0) {
        historyContainer.innerHTML = '<p style="font-size: 0.8rem; opacity: 0.7; text-align: center; margin: 1rem 0;">No customers found</p>';
        return;
    }
    
    // Sort by last used (most recent first)
    filteredCustomers.sort((a, b) => new Date(b.lastUsed) - new Date(a.lastUsed));
    
    historyContainer.innerHTML = filteredCustomers.map(customer => {
        const lastUsed = new Date(customer.lastUsed);
        const phoneDisplay = customer.phone ? `📞 ${customer.phone}` : '';
        const locationDisplay = customer.location ? `📍 ${customer.location}` : '';
        
        return `
            <div class="customer-item" onclick="loadCustomer('${customer.id}')">
                <div class="customer-name">${customer.name}</div>
                <div class="customer-details">
                    ${phoneDisplay} ${locationDisplay}
                </div>
                <div class="customer-date">Last used: ${lastUsed.toLocaleDateString()}</div>
            </div>
        `;
    }).join('');
}

// Initialize invoice history on page load
document.addEventListener('DOMContentLoaded', function() {
    autoCleanupInvoices();
    displaySavedCustomers();
    populateCustomerDropdown();
    
    // Set up periodic cleanup (every hour)
    setInterval(autoCleanupInvoices, 60 * 60 * 1000);
});

// QR code editing functions
function editBarcode(productId) {
    const barcodeNumber = document.querySelector(`[data-product-id="${productId}"] .barcode-number`);
    const barcodeBars = document.querySelector(`[data-product-id="${productId}"] .barcode-bars`);
    const barcodeInput = document.getElementById(`barcode-input-${productId}`);
    
    if (barcodeNumber && barcodeBars && barcodeInput) {
        // Hide display elements
        barcodeNumber.style.display = 'none';
        barcodeBars.style.display = 'none';
        
        // Show and focus input
        barcodeInput.style.display = 'block';
        barcodeInput.focus();
        barcodeInput.select();
    }
}

function saveBarcode(productId) {
    const barcodeNumber = document.querySelector(`[data-product-id="${productId}"] .barcode-number`);
    const barcodeBars = document.querySelector(`[data-product-id="${productId}"] .barcode-bars`);
    const barcodeInput = document.getElementById(`barcode-input-${productId}`);
    
    if (barcodeNumber && barcodeBars && barcodeInput) {
        const newBarcodeValue = barcodeInput.value.trim();
        
        // Update the product data
        const product = findProductById(productId);
        if (product) {
            product.barcode = newBarcodeValue;
        }
        
        // Generate new pattern
        const newPattern = generateLinearBarcode(newBarcodeValue);
        
        // Update display
        barcodeNumber.textContent = newBarcodeValue;
        barcodeBars.textContent = newPattern;
        
        // Hide input and show display elements
        barcodeInput.style.display = 'none';
        barcodeNumber.style.display = 'block';
        barcodeBars.style.display = 'flex';
    }
}

function findProductById(productId) {
    // Search in all brand categories
    for (const brand of Object.values(products)) {
        for (const category of Object.values(brand)) {
            const product = category.find(p => p.id === productId);
            if (product) return product;
        }
    }
    return null;
}

// Import barcode from file
function importBarcode(productId) {
    const fileInput = document.getElementById(`barcode-file-${productId}`);
    if (fileInput) {
        fileInput.click();
    }
}

// Handle barcode file import
function handleBarcodeFileImport(productId, event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            let barcodeValue = '';
            const content = e.target.result;
            
            // Handle different file types
            if (file.name.endsWith('.json')) {
                const data = JSON.parse(content);
                barcodeValue = data.barcode || data.code || data.value || '';
            } else if (file.name.endsWith('.csv')) {
                const lines = content.split('\n');
                // Assume first line has barcode or first column
                barcodeValue = lines[0].split(',')[0].trim();
            } else {
                // Plain text file
                barcodeValue = content.trim().split('\n')[0];
            }
            
            // Clean and validate barcode
            barcodeValue = barcodeValue.replace(/[^0-9]/g, '').substring(0, 6);
            
            if (barcodeValue) {
                // Update product
                const product = findProductById(productId);
                if (product) {
                    product.barcode = barcodeValue;
                }
                
                // Update display
                updateBarcodeDisplay(productId, barcodeValue);
                
                alert(`Barcode imported successfully: ${barcodeValue}`);
            } else {
                alert('No valid barcode found in file');
            }
        } catch (error) {
            alert('Error reading file: ' + error.message);
        }
        
        // Reset file input
        event.target.value = '';
    };
    
    reader.readAsText(file);
}

// Download barcode
function downloadBarcode(productId) {
    const product = findProductById(productId);
    if (!product || !product.barcode) {
        alert('No barcode to download');
        return;
    }
    
    const barcodeData = {
        productId: product.id,
        productName: product.name,
        barcode: product.barcode,
        pattern: generateLinearBarcode(product.barcode),
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(barcodeData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `barcode_${product.name.replace(/[^a-zA-Z0-9]/g, '_')}_${product.barcode}.json`;
    link.click();
    
    URL.revokeObjectURL(link.href);
}

// Delete barcode
function deleteBarcode(productId) {
    if (confirm('Are you sure you want to delete this barcode?')) {
        const product = findProductById(productId);
        if (product) {
            product.barcode = '';
        }
        
        // Update display
        updateBarcodeDisplay(productId, '');
        
        alert('Barcode deleted successfully');
    }
}

// Update barcode display helper function
function updateBarcodeDisplay(productId, barcodeValue) {
    const barcodeNumber = document.querySelector(`[data-product-id="${productId}"] .barcode-number`);
    const barcodeBars = document.querySelector(`[data-product-id="${productId}"] .barcode-bars`);
    const barcodeInput = document.getElementById(`barcode-input-${productId}`);
    const barcodeInfo = document.querySelector(`[data-product-id="${productId}"] .barcode-info`);
    
    if (barcodeNumber && barcodeBars && barcodeInput) {
        const newPattern = generateLinearBarcode(barcodeValue);
        const info = getBarcodeInfo(barcodeValue);
        const validation = validateBarcodeForScanner(barcodeValue);
        
        barcodeNumber.textContent = barcodeValue || 'Click to add barcode';
        barcodeBars.textContent = newPattern;
        barcodeInput.value = barcodeValue;
        
        // Update barcode info display
        if (barcodeInfo) {
            const scannerStatusClass = validation.valid ? 'scanner-compatible' : 'scanner-incompatible';
            const scannerIcon = validation.valid ? '✅' : '❌';
            
            barcodeInfo.innerHTML = `
                <span class="barcode-type">${info.type}</span>
                <span class="scanner-status ${scannerStatusClass}" title="${validation.message}">
                    ${scannerIcon} ${validation.valid ? 'Scanner Ready' : 'Not Compatible'}
                </span>
            `;
        }
    }
}

// Bulk QR Code Management Functions
function importAllBarcodes() {
    const fileInput = document.getElementById('bulkBarcodeFile');
    if (fileInput) {
        fileInput.click();
    }
}

function handleBulkBarcodeImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const content = e.target.result;
            let barcodeData = [];
            
            if (file.name.endsWith('.json')) {
                barcodeData = JSON.parse(content);
            } else if (file.name.endsWith('.csv')) {
                const lines = content.split('\n');
                for (let i = 1; i < lines.length; i++) { // Skip header
                    const cols = lines[i].split(',');
                    if (cols.length >= 2) {
                        barcodeData.push({
                            productId: parseInt(cols[0]),
                            barcode: cols[1].trim()
                        });
                    }
                }
            }
            
            let updateCount = 0;
            barcodeData.forEach(item => {
                const product = findProductById(item.productId);
                if (product && item.barcode) {
                    product.barcode = item.barcode.replace(/[^0-9]/g, '').substring(0, 6);
                    updateBarcodeDisplay(item.productId, product.barcode);
                    updateCount++;
                }
            });
            
            alert(`Successfully imported ${updateCount} barcodes`);
            
        } catch (error) {
            alert('Error importing file: ' + error.message);
        }
        
        event.target.value = '';
    };
    
    reader.readAsText(file);
}

function exportAllBarcodes() {
    const allBarcodes = [];
    
    // Collect all products with barcodes
    for (const brand of Object.values(products)) {
        for (const category of Object.values(brand)) {
            category.forEach(product => {
                if (product.barcode) {
                    allBarcodes.push({
                        productId: product.id,
                        productName: product.name,
                        barcode: product.barcode,
                        pattern: generateLinearBarcode(product.barcode)
                    });
                }
            });
        }
    }
    
    if (allBarcodes.length === 0) {
        alert('No barcodes to export');
        return;
    }
    
    const dataStr = JSON.stringify(allBarcodes, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `all_barcodes_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(link.href);
}

function generateAllBarcodes() {
    let startNumber = prompt('Enter starting barcode number (6 digits):', '100001');
    if (!startNumber) return;
    
    startNumber = parseInt(startNumber.replace(/[^0-9]/g, ''));
    if (isNaN(startNumber)) {
        alert('Invalid starting number');
        return;
    }
    
    let counter = startNumber;
    let updateCount = 0;
    
    // Generate sequential barcodes for all products
    for (const brand of Object.values(products)) {
        for (const category of Object.values(brand)) {
            category.forEach(product => {
                const barcodeValue = counter.toString().padStart(6, '0');
                product.barcode = barcodeValue;
                updateBarcodeDisplay(product.id, barcodeValue);
                counter++;
                updateCount++;
            });
        }
    }
    
    alert(`Generated ${updateCount} sequential barcodes starting from ${startNumber}`);
}

function clearAllBarcodes() {
    if (confirm('Are you sure you want to clear ALL barcodes? This cannot be undone.')) {
        let clearCount = 0;
        
        // Clear all barcodes
        for (const brand of Object.values(products)) {
            for (const category of Object.values(brand)) {
                category.forEach(product => {
                    if (product.barcode) {
                        product.barcode = '';
                        updateBarcodeDisplay(product.id, '');
                        clearCount++;
                    }
                });
            }
        }
        
        alert(`Cleared ${clearCount} barcodes`);
    }
}

// Toggle bulk QR code management visibility
function toggleBulkManagement() {
    const bulkSection = document.getElementById('bulkBarcodeSection');
    const toggleBtn = document.querySelector('.toggle-bulk-btn');
    
    if (bulkSection && bulkSection.classList.contains('collapsed')) {
        bulkSection.classList.remove('collapsed');
        toggleBtn.textContent = '⚙️ Hide Tools';
        toggleBtn.title = 'Hide Bulk Barcode Management';
    } else if (bulkSection) {
        bulkSection.classList.add('collapsed');
        toggleBtn.textContent = '⚙️ Bulk Tools';
        toggleBtn.title = 'Show Bulk Barcode Management';
    }
}

// Toggle bulk management visibility

// Generate QR code with custom product and brand information
function generateQRCodeWithCustomInfo(productName, brandName) {
    // Create QR code data based on input
    const timestamp = Date.now();
    const productCode = productName.replace(/\s+/g, '').substring(0, 8).toUpperCase();
    const brandCode = brandName.replace(/\s+/g, '').substring(0, 6).toUpperCase();
    
    // Format: BRAND-PRODUCT-TIMESTAMP
    const generatedQR = `${brandCode}-${productCode}-${timestamp}`.substring(0, 30);
    
    // Validate the generated QR code
    const validation = validateBarcodeForScanner(generatedQR);
    
    if (validation.valid) {
        // Create a virtual product entry for the QR folder
        const virtualProduct = {
            id: Date.now(), // Use timestamp as unique ID
            name: `${brandName} ${productName}`, // Full display name
            productName: productName, // Product name only
            barcode: generatedQR,
            brand: brandName,
            category: 'Custom Generated',
            isVirtual: true // Mark as virtual product
        };
        
        // Add to a virtual products array or storage
        if (!window.virtualQRProducts) {
            window.virtualQRProducts = [];
        }
        window.virtualQRProducts.push(virtualProduct);
        
        // Save virtual products to localStorage
        localStorage.setItem('virtualQRProducts', JSON.stringify(window.virtualQRProducts));
        
        // Refresh displays
        populateBarcodeFolder();
        updateBarcodeStats();
        
        // Show success message
        alert(`QR Code Generated Successfully!\n\nProduct: ${productName}\nBrand: ${brandName}\nGenerated QR: ${generatedQR}\nType: QR Code\nStatus: ${validation.message}\n\nThe QR code has been generated and added to the QR folder.`);
    } else {
        alert(`Failed to generate valid QR code!\nError: ${validation.message}\n\nPlease try again with different product/brand names.`);
    }
}

function populateBarcodeFolder() {
    const barcodeList = document.getElementById('barcodeList');
    if (!barcodeList) return;
    
    let barcodeEntries = [];
    
    // Collect all products with barcodes
    for (const brand of Object.values(products)) {
        for (const category of Object.values(brand)) {
            category.forEach(product => {
                if (product.barcode && product.barcode.trim() !== '') {
                    const info = getBarcodeInfo(product.barcode);
                    const validation = validateBarcodeForScanner(product.barcode);
                    
                    barcodeEntries.push({
                        id: product.id,
                        productName: product.name,
                        barcode: product.barcode,
                        type: info.type,
                        scannable: validation.valid,
                        pattern: generateLinearBarcode(product.barcode),
                        isVirtual: false
                    });
                }
            });
        }
    }
    
    // Load and include virtual QR products
    if (!window.virtualQRProducts) {
        const savedVirtual = localStorage.getItem('virtualQRProducts');
        window.virtualQRProducts = savedVirtual ? JSON.parse(savedVirtual) : [];
    }
    
    // Add virtual QR products to the list
    window.virtualQRProducts.forEach(virtualProduct => {
        if (virtualProduct.barcode && virtualProduct.barcode.trim() !== '') {
            const info = getBarcodeInfo(virtualProduct.barcode);
            const validation = validateBarcodeForScanner(virtualProduct.barcode);
            
            barcodeEntries.push({
                id: virtualProduct.id,
                productName: virtualProduct.name,
                brandName: virtualProduct.brand || 'Unknown Brand',
                productOnly: virtualProduct.productName || virtualProduct.name,
                barcode: virtualProduct.barcode,
                type: info.type,
                scannable: validation.valid,
                pattern: generateLinearBarcode(virtualProduct.barcode),
                isVirtual: true
            });
        }
    });
    
    if (barcodeEntries.length === 0) {
        barcodeList.innerHTML = '<div class="no-barcodes">No barcodes found. Add barcodes to products first.</div>';
        return;
    }
    
    let html = '';
    barcodeEntries.forEach(entry => {
        const statusClass = entry.scannable ? 'scanner-ready' : 'scanner-error';
        const statusIcon = entry.scannable ? '✅' : '❌';
        
        // Create display name based on whether it's virtual or not
        let displayName = '';
        let productInfo = '';
        
        if (entry.isVirtual) {
            displayName = `${entry.brandName} - ${entry.productOnly}`;
            productInfo = `
                <div class="product-details">
                    <span class="brand-info">🏷️ Brand: ${entry.brandName}</span>
                    <span class="product-info">📦 Product: ${entry.productOnly}</span>
                </div>
            `;
        } else {
            displayName = entry.productName;
            productInfo = '';
        }
        
        html += `
            <div class="barcode-entry" data-product-id="${entry.id}" data-is-virtual="${entry.isVirtual}">
                <div class="barcode-header">
                    <span class="product-name">${displayName}</span>
                    <span class="barcode-type">${entry.type}</span>
                    <span class="scanner-status ${statusClass}">${statusIcon}</span>
                </div>
                ${productInfo}
                <div class="barcode-display-folder">
                    <div class="barcode-pattern">${entry.pattern}</div>
                    <div class="barcode-number">${entry.barcode}</div>
                </div>
                <div class="barcode-actions">
                    <button class="barcode-action-btn edit-btn" onclick="editBarcodeInFolder(${entry.id})" title="Edit QR Code">
                        ✏️ Edit
                    </button>
                    <button class="barcode-action-btn download-btn" onclick="downloadSingleBarcode(${entry.id})" title="Download QR Code">
                        💾 Download
                    </button>
                    <button class="barcode-action-btn delete-btn" onclick="deleteBarcodeInFolder(${entry.id})" title="Delete QR Code">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
    });
    
    barcodeList.innerHTML = html;
    
    // Update search result count after populating the list
    updateSearchResultCount();
}

function updateBarcodeStats() {
    let totalCount = 0;
    let scannerReadyCount = 0;
    
    for (const brand of Object.values(products)) {
        for (const category of Object.values(brand)) {
            category.forEach(product => {
                if (product.barcode && product.barcode.trim() !== '') {
                    totalCount++;
                    // Barcode scanner validation removed
                }
            });
        }
    }
    
    const totalElement = document.getElementById('totalBarcodes');
    const readyElement = document.getElementById('scannerReady');
    
    if (totalElement) totalElement.textContent = totalCount;
    if (readyElement) readyElement.textContent = scannerReadyCount;
}

function filterProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const entries = document.querySelectorAll('.barcode-entry');
    
    entries.forEach(entry => {
        const productName = entry.querySelector('.product-name').textContent.toLowerCase();
        const barcodeNumber = entry.querySelector('.barcode-number').textContent.toLowerCase();
        
        // Search in brand and product info for virtual products
        let brandText = '';
        let productText = '';
        const brandInfo = entry.querySelector('.brand-info');
        const productInfo = entry.querySelector('.product-info');
        
        if (brandInfo) {
            brandText = brandInfo.textContent.toLowerCase();
        }
        if (productInfo) {
            productText = productInfo.textContent.toLowerCase();
        }
        
        // Check if search term matches any of the fields
        const matchesSearch = productName.includes(searchTerm) || 
                            barcodeNumber.includes(searchTerm) ||
                            brandText.includes(searchTerm) ||
                            productText.includes(searchTerm);
        
        if (matchesSearch) {
            entry.style.display = 'block';
        } else {
            entry.style.display = 'none';
        }
    });
    
    // Update search result count
    updateSearchResultCount();
}

// Update search result count
function updateSearchResultCount() {
    const visibleEntries = document.querySelectorAll('.barcode-entry[style*="block"], .barcode-entry:not([style*="none"])');
    const totalEntries = document.querySelectorAll('.barcode-entry');
    const searchTerm = document.getElementById('productSearch').value;
    
    // Create or update search info
    let searchInfo = document.getElementById('searchInfo');
    if (!searchInfo) {
        searchInfo = document.createElement('div');
        searchInfo.id = 'searchInfo';
        searchInfo.className = 'search-info';
        const searchContainer = document.querySelector('.product-search');
        searchContainer.appendChild(searchInfo);
    }
    
    if (searchTerm.trim() === '') {
        searchInfo.textContent = `Showing all ${totalEntries.length} products`;
    } else {
        const visibleCount = Array.from(visibleEntries).filter(entry => 
            entry.style.display !== 'none'
        ).length;
        searchInfo.textContent = `Found ${visibleCount} of ${totalEntries.length} products`;
    }
}

function editBarcodeInFolder(productId) {
    // Check if it's a virtual product first
    let product = null;
    let isVirtual = false;
    
    if (window.virtualQRProducts) {
        product = window.virtualQRProducts.find(vp => vp.id == productId);
        if (product) {
            isVirtual = true;
        }
    }
    
    // If not virtual, check regular products
    if (!product) {
        product = findProductById(productId);
    }
    
    if (!product) {
        alert('Product not found!');
        return;
    }
    
    const currentBarcode = product.barcode || '';
    const currentInfo = getBarcodeInfo(currentBarcode);
    const currentValidation = validateBarcodeForScanner(currentBarcode);
    
    // Create a more detailed prompt with current info
    const productType = isVirtual ? ' (Generated)' : '';
    const message = `Edit QR Code for: ${product.name}${productType}\n\nCurrent QR Code: ${currentBarcode}\nType: ${currentInfo.type}\nStatus: ${currentValidation.message}\n\nEnter new QR code data:`;
    
    const newBarcode = prompt(message, currentBarcode);
    
    if (newBarcode !== null) {
        const trimmedBarcode = newBarcode.trim();
        
        // Validate the new QR code
        const newValidation = validateBarcodeForScanner(trimmedBarcode);
        
        if (trimmedBarcode === '') {
            if (confirm('This will remove the QR code from the product. Continue?')) {
                if (isVirtual) {
                    // Remove virtual product entirely
                    const virtualIndex = window.virtualQRProducts.findIndex(vp => vp.id == productId);
                    if (virtualIndex !== -1) {
                        window.virtualQRProducts.splice(virtualIndex, 1);
                        localStorage.setItem('virtualQRProducts', JSON.stringify(window.virtualQRProducts));
                    }
                } else {
                    // Remove QR from regular product
                    product.barcode = '';
                    localStorage.setItem('invoiceProducts', JSON.stringify(products));
                    updateBarcodeDisplay(productId, '');
                }
                populateBarcodeFolder();
                updateBarcodeStats();
                alert('QR code removed successfully!');
            }
        } else if (newValidation.valid) {
            product.barcode = trimmedBarcode;
            
            if (isVirtual) {
                // Save virtual products
                localStorage.setItem('virtualQRProducts', JSON.stringify(window.virtualQRProducts));
            } else {
                // Save regular products
                localStorage.setItem('invoiceProducts', JSON.stringify(products));
                updateBarcodeDisplay(productId, product.barcode);
            }
            
            populateBarcodeFolder();
            updateBarcodeStats();
            alert(`QR code updated successfully!\nNew QR Code: ${trimmedBarcode}\nStatus: ${newValidation.message}`);
        } else {
            alert(`Invalid QR code data!\nError: ${newValidation.message}\n\nPlease try again with valid data.`);
        }
    }
}

function downloadSingleBarcode(productId) {
    downloadBarcode(productId);
}

function deleteBarcodeInFolder(productId) {
    if (confirm('Are you sure you want to delete this QR code?')) {
        // Check if it's a virtual product first
        if (window.virtualQRProducts) {
            const virtualIndex = window.virtualQRProducts.findIndex(vp => vp.id == productId);
            if (virtualIndex !== -1) {
                // Remove virtual product
                window.virtualQRProducts.splice(virtualIndex, 1);
                localStorage.setItem('virtualQRProducts', JSON.stringify(window.virtualQRProducts));
                populateBarcodeFolder();
                updateBarcodeStats();
                return;
            }
        }
        
        // Handle regular products
        const product = findProductById(productId);
        if (product) {
            product.barcode = '';
            updateBarcodeDisplay(productId, '');
            populateBarcodeFolder();
            updateBarcodeStats();
        }
    }
}

function importBarcodeFile() {
    const fileInput = document.getElementById('barcodeImportFile');
    if (fileInput) {
        fileInput.click();
    }
}

function handleBarcodeManagerImport(event) {
    handleBulkBarcodeImport(event);
    setTimeout(() => {
        populateBarcodeFolder();
        updateBarcodeStats();
    }, 100);
}

function generateSequentialBarcodes() {
    generateAllBarcodes();
    setTimeout(() => {
        populateBarcodeFolder();
        updateBarcodeStats();
    }, 100);
}

// Sidebar Toggle Functions
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    
    const isHidden = sidebar.classList.contains('hidden');
    
    if (isHidden) {
        // Show sidebar
        sidebar.classList.remove('hidden');
        if (mainContent) {
            mainContent.classList.remove('sidebar-hidden');
        }
        if (toggleBtn) {
            toggleBtn.innerHTML = '☰';
            toggleBtn.title = 'Hide Sidebar';
        }
        console.log('🔓 Sidebar opened');
    } else {
        // Hide sidebar
        sidebar.classList.add('hidden');
        if (mainContent) {
            mainContent.classList.add('sidebar-hidden');
        }
        if (toggleBtn) {
            toggleBtn.innerHTML = '☰';
            toggleBtn.title = 'Show Sidebar';
        }
        console.log('🔒 Sidebar closed');
    }
    
    // Store sidebar state in localStorage
    localStorage.setItem('sidebarHidden', !isHidden);
}

// Restore sidebar state on page load
function restoreSidebarState() {
    const sidebarHidden = localStorage.getItem('sidebarHidden') === 'true';
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    
    if (sidebarHidden) {
        sidebar.classList.add('hidden');
        if (mainContent) {
            mainContent.classList.add('sidebar-hidden');
        }
        if (toggleBtn) {
            toggleBtn.title = 'Show Sidebar';
        }
        console.log('🔒 Sidebar restored as closed');
    } else {
        if (toggleBtn) {
            toggleBtn.title = 'Hide Sidebar';
        }
        console.log('🔓 Sidebar restored as open');
    }
}

function openSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    sidebar.classList.add('open');
    if (overlay) {
        overlay.classList.add('active');
    }
    
    // Prevent body scroll when sidebar is open on mobile
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    sidebar.classList.remove('open');
    if (overlay) {
        overlay.classList.remove('active');
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
}

function createSidebarOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.addEventListener('click', closeSidebar);
    document.body.appendChild(overlay);
}

// Auto-close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    // Only on mobile screens
    if (window.innerWidth <= 768) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('open')) {
            closeSidebar();
        }
    }
});

// Close sidebar when window is resized to desktop
window.addEventListener('resize', function() {
    const sidebar = document.querySelector('.sidebar');
    
    if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
        closeSidebar();
    }
});

// Initialize responsive features
document.addEventListener('DOMContentLoaded', function() {
    // Add swipe gesture support for mobile
    let touchStartX = null;
    let touchStartY = null;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only on mobile screens and if horizontal swipe is more significant than vertical
        if (window.innerWidth <= 768 && Math.abs(diffX) > Math.abs(diffY)) {
            const sidebar = document.querySelector('.sidebar');
            
            // Swipe right to open sidebar (from left edge)
            if (diffX < -50 && touchStartX < 50 && !sidebar.classList.contains('open')) {
                openSidebar();
                touchStartX = null;
                touchStartY = null;
            }
            
            // Swipe left to close sidebar
            if (diffX > 50 && sidebar.classList.contains('open')) {
                closeSidebar();
                touchStartX = null;
                touchStartY = null;
            }
        }
    }, { passive: true });
    
    document.addEventListener('touchend', function() {
        touchStartX = null;
        touchStartY = null;
    });
});

console.log('📱 Responsive mobile features initialized');

// Add Custom Product Modal Function
function openAddCustomProductModal() {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 2rem; border-radius: 15px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
                <h2 style="margin-bottom: 1.5rem; color: #333; text-align: center;">➕✏️🗑️ Custom Product</h2>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Product Name:</label>
                    <input type="text" id="customProductName" placeholder="Enter product name" 
                           style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Price ($):</label>
                    <input type="number" id="customProductPrice" placeholder="0.00" step="0.01" min="0"
                           style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Brand:</label>
                    <input type="text" id="customProductBrand" placeholder="Enter brand name" 
                           style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Description (Optional):</label>
                    <textarea id="customProductDescription" placeholder="Enter product description" 
                              style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem; height: 80px; resize: vertical;"></textarea>
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Quantity (if adding to invoice):</label>
                    <input type="number" id="customProductQuantity" placeholder="1" value="1" min="1" max="999"
                           style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem;">
                </div>
                <div style="margin-bottom: 2rem; padding: 1rem; background: #f8f9fa; border-radius: 8px; border: 2px solid #e9ecef;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-weight: bold; color: #555;">
                        <input type="checkbox" id="addToInvoiceCheckbox" 
                               style="width: 18px; height: 18px; cursor: pointer;">
                        <span>📋 Add directly to current invoice</span>
                    </label>
                    <div style="margin-top: 0.5rem; font-size: 0.9rem; color: #666;">
                        Check this to add the product to your invoice immediately after creation
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button onclick="addCustomProduct()" 
                            style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
                        ➕ Add
                    </button>
                    <button onclick="closeAddCustomProductModal()" 
                            style="background: #e5e7eb; color: #222; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
                        ❌ Cancel
                    </button>
                </div>
                <div id="customProductResult" style="margin-top:1em; text-align:center; font-weight:600;"></div>
            </div>
        </div>
    `;
    // Edit Custom Product Function
    function editCustomProduct() {
        const name = document.getElementById('customProductName').value.trim();
        const price = parseFloat(document.getElementById('customProductPrice').value);
        const brand = document.getElementById('customProductBrand').value.trim();
        const description = document.getElementById('customProductDescription').value.trim();
        if (!name || !brand) {
            document.getElementById('customProductResult').innerText = '⚠️ Enter product name and brand to edit.';
            return;
        }
        if (!productCatalog[brand]) {
            document.getElementById('customProductResult').innerText = '⚠️ Brand not found.';
            return;
        }
        const product = productCatalog[brand].find(p => p.name === name);
        if (!product) {
            document.getElementById('customProductResult').innerText = '⚠️ Product not found.';
            return;
        }
        if (price > 0) product.price = price.toFixed(2);
        if (description) product.description = description;
        document.getElementById('customProductResult').innerText = `✏️ Product "${name}" updated!`;
        renderCatalogProducts && renderCatalogProducts();
    }

    // Delete Custom Product Function
    function deleteCustomProduct() {
        const name = document.getElementById('customProductName').value.trim();
        const brand = document.getElementById('customProductBrand').value.trim();
        if (!name || !brand) {
            document.getElementById('customProductResult').innerText = '⚠️ Enter product name and brand to delete.';
            return;
        }
        if (!productCatalog[brand]) {
            document.getElementById('customProductResult').innerText = '⚠️ Brand not found.';
            return;
        }
        const idx = productCatalog[brand].findIndex(p => p.name === name);
        if (idx === -1) {
            document.getElementById('customProductResult').innerText = '⚠️ Product not found.';
            return;
        }
        productCatalog[brand].splice(idx, 1);
        document.getElementById('customProductResult').innerText = `🗑️ Product "${name}" deleted!`;
        renderCatalogProducts && renderCatalogProducts();
    }
    modal.id = 'customProductModal';
    document.body.appendChild(modal);
}

// Close Add Custom Product Modal
function closeAddCustomProductModal() {
    const modal = document.getElementById('customProductModal');
    if (modal) {
        modal.remove();
    }
}

// Add Custom Product Function
function addCustomProduct() {
    const name = document.getElementById('customProductName').value.trim();
    const price = parseFloat(document.getElementById('customProductPrice').value);
    const brand = document.getElementById('customProductBrand').value.trim();
    const description = document.getElementById('customProductDescription').value.trim();
    const quantity = parseInt(document.getElementById('customProductQuantity').value) || 1;
    const addToInvoice = document.getElementById('addToInvoiceCheckbox').checked;
    
    if (!name || !price || !brand) {
        alert('⚠️ Please fill in all required fields (Name, Price, Brand)');
        return;
    }
    
    if (price <= 0) {
        alert('⚠️ Price must be greater than 0');
        return;
    }
    
    if (quantity <= 0 || quantity > 999) {
        alert('⚠️ Quantity must be between 1 and 999');
        return;
    }
    
    // Create new product object
    const newProduct = {
        name: name,
        price: price.toFixed(2),
        description: description || 'Custom product',
        image: 'https://via.placeholder.com/150x150?text=' + encodeURIComponent(name.substring(0, 2))
    };
    
    // Add to product catalog
    if (!productCatalog[brand]) {
        productCatalog[brand] = [];
    }
    productCatalog[brand].push(newProduct);
    
    // Add to invoice if checkbox is checked
    if (addToInvoice) {
        for (let i = 0; i < quantity; i++) {
            addItemToInvoice(name, parseFloat(price.toFixed(2)));
        }
    }
    
    // Refresh catalog display
    initializeCatalogSidebar();
    renderCatalogProducts();
    
    // Close modal
    closeAddCustomProductModal();
    
    // Show success message
    let successMessage = '✅ Custom product "' + name + '" added successfully to ' + brand + '!';
    if (addToInvoice) {
        successMessage += '\n📋 ' + quantity + ' item(s) added to your invoice.';
    }
    alert(successMessage);
}







// Index.html specific functions
function toggleSidebar() {
    var appWrapper = document.querySelector('.app-wrapper');
    var toggleBtn = document.getElementById('mobileMenuToggle');
    
    if (appWrapper.classList.contains('sidebar-collapsed')) {
        // Show sidebar
        appWrapper.classList.remove('sidebar-collapsed');
        if (toggleBtn) {
            toggleBtn.innerHTML = '☰';
            toggleBtn.title = 'Hide Sidebar';
            toggleBtn.style.transform = 'rotate(0deg)';
        }
    } else {
        // Hide sidebar
        appWrapper.classList.add('sidebar-collapsed');
        if (toggleBtn) {
            toggleBtn.innerHTML = '☰';
            toggleBtn.title = 'Show Sidebar';
            toggleBtn.style.transform = 'rotate(90deg)';
        }
    }
}

// If coming from product-actions.html, enable catalog-only mode, open catalog, show header, and set user info
if (sessionStorage.getItem('catalogOnlyMode') === 'true') {
    window.catalogOnlyMode = true;
    sessionStorage.removeItem('catalogOnlyMode');
    // Set admin username and login time for display if not already set
    if (!sessionStorage.getItem('adminUser')) {
        sessionStorage.setItem('adminUser', 'Xing');
    }
    // Only set loginTime if not already set (preserve original login time)
    if (!sessionStorage.getItem('loginTime')) {
        sessionStorage.setItem('loginTime', new Date().toISOString());
    }
    window.addEventListener('DOMContentLoaded', function() {
        // Always show admin header when returning from product-actions
        var adminHeader = document.querySelector('.admin-header');
        if (adminHeader) adminHeader.style.display = '';
        // Set header text dynamically
        var adminUsername = document.getElementById('adminUsername');
        var loginTimeElem = document.getElementById('loginTime');
        var timerElem = document.getElementById('headerTimer');
        var adminName = sessionStorage.getItem('adminUser') || 'Admin';
        var loginTimeRaw = sessionStorage.getItem('loginTime');
        var loginTimeStr = '';
        if (loginTimeRaw) {
            var date = new Date(loginTimeRaw);
            loginTimeStr = 'Logged in: ' + date.toLocaleString();
        } else {
            loginTimeStr = '';
        }
        if (adminUsername) adminUsername.textContent = adminName;
        if (loginTimeElem) loginTimeElem.textContent = loginTimeStr;
        // Start live timer
        if (timerElem) {
            function updateTimer() {
                var now = new Date();
                timerElem.textContent = now.toLocaleTimeString();
            }
            updateTimer();
            setInterval(updateTimer, 1000);
        }
        if (typeof toggleProductCatalog === 'function') {
            toggleProductCatalog();
        } else {
            setTimeout(function() {
                if (typeof toggleProductCatalog === 'function') toggleProductCatalog();
            }, 500);
        }
    });
} else {
    // Always start live timer on header load
    window.addEventListener('DOMContentLoaded', function() {
        var timerElem = document.getElementById('headerTimer');
        if (timerElem) {
            function updateTimer() {
                var now = new Date();
                timerElem.textContent = now.toLocaleTimeString();
            }
            updateTimer();
            setInterval(updateTimer, 1000);
        }
    });
}

function updateDateDisplay() {
    const dateInput = document.getElementById('invoiceDate');
    const dateDisplay = document.getElementById('invoiceDateDisplay');
    
    if (dateInput && dateInput.value) {
        const date = new Date(dateInput.value + 'T00:00:00');
        const now = new Date();
        const dateStr = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        
        // For screen: show as "12/10/25, 10:16 PM"
        // For print: CSS will format it with line break
        dateDisplay.textContent = dateStr;
        dateDisplay.setAttribute('data-time', timeStr);
    } else if (dateDisplay) {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        
        dateDisplay.textContent = dateStr;
        dateDisplay.setAttribute('data-time', timeStr);
    }
}

// Scroll to specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // If it's in sidebar, scroll the sidebar content
        const sidebar = document.querySelector('.sidebar-content');
        if (sidebar && sidebar.contains(section)) {
            const sectionTop = section.offsetTop - sidebar.offsetTop;
            sidebar.scrollTo({ top: sectionTop - 20, behavior: 'smooth' });
        } else {
            // Otherwise scroll the main window
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Toggle admin control panel visibility
function toggleAdminControls() {
    const panel = document.getElementById('adminControlPanel');
    const toggle = document.getElementById('adminControlToggle');
    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        toggle.innerHTML = '⚙️ Admin Controls ▲';
    } else {
        panel.style.display = 'none';
        toggle.innerHTML = '⚙️ Admin Controls';
    }
}

// Set today's date on page load for index.html
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', function() {
        const dateInput = document.getElementById('invoiceDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;
            updateDateDisplay();
        }
    });
}

// Function to handle edit and delete operations for products in catalog
function openSystemProductForm(action, brand, productName, price) {
    if (action === 'edit') {
        // Get current product image
        const currentProduct = productCatalog[brand]?.find(p => p.name === productName);
        const currentImage = currentProduct?.image || '';
        
        // Create edit modal
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;">
                <div style="background: white; padding: 2rem; border-radius: 15px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
                    <h2 style="margin-bottom: 1.5rem; color: #333; text-align: center;">✏️ Edit Product</h2>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Product Name:</label>
                        <input type="text" id="editProductName" value="${productName.replace(/'/g, "\\'")}" 
                               style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Price ($):</label>
                        <input type="number" id="editProductPrice" value="${price}" step="0.01" min="0"
                               style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Brand:</label>
                        <input type="text" id="editProductBrand" value="${brand}" 
                               style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #555;">Product Image:</label>
                        <div style="border: 2px dashed #ddd; border-radius: 8px; padding: 1rem; text-align: center; background: #f9f9f9;">
                            <input type="file" id="editProductImage" accept="image/*" 
                                   style="display: none;" onchange="previewEditImage(event)">
                            <div id="imagePreview" style="margin-bottom: 1rem;">
                                <img id="editImagePreview" src="${currentImage}" alt="Current Image" 
                                     style="max-width: 100px; max-height: 100px; border-radius: 8px; ${currentImage ? 'display: block;' : 'display: none;'} object-fit: cover;">
                                <div id="noImageText" style="color: #666; font-style: italic; ${currentImage ? 'display: none;' : 'display: block;'}">No image selected</div>
                            </div>
                            <button type="button" onclick="document.getElementById('editProductImage').click()" 
                                    style="background: #007bff; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-weight: 500;">
                                📁 Choose Image
                            </button>
                            <div style="margin-top: 0.5rem; font-size: 0.85rem; color: #666;">
                                Supported formats: JPG, PNG, WebP, GIF
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button onclick="saveProductEdit('${brand}', '${productName.replace(/'/g, "\\'")}')" 
                                style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
                            💾 Save Changes
                        </button>
                        <button onclick="closeEditModal()" 
                                style="background: #e5e7eb; color: #222; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
                            ❌ Cancel
                        </button>
                    </div>
                    <div id="editResult" style="margin-top:1em; text-align:center; font-weight:600;"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else if (action === 'delete') {
        // Create delete confirmation modal
        if (confirm(`Are you sure you want to delete "${productName}" from ${brand}?`)) {
            deleteProductFromCatalog(brand, productName);
        }
    }
}

// Function to save product edits
function saveProductEdit(oldBrand, oldProductName) {
    const newName = document.getElementById('editProductName').value.trim();
    const newPrice = parseFloat(document.getElementById('editProductPrice').value);
    const newBrand = document.getElementById('editProductBrand').value.trim();
    const imageFile = document.getElementById('editProductImage').files[0];
    
    if (!newName || !newBrand) {
        document.getElementById('editResult').innerText = '⚠️ Please enter both product name and brand.';
        return;
    }
    
    if (!productCatalog[oldBrand]) {
        document.getElementById('editResult').innerText = '⚠️ Original brand not found.';
        return;
    }
    
    const productIndex = productCatalog[oldBrand].findIndex(p => p.name === oldProductName);
    if (productIndex === -1) {
        document.getElementById('editResult').innerText = '⚠️ Product not found.';
        return;
    }
    
    // Handle image upload
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageDataUrl = e.target.result;
            updateProductWithImage(oldBrand, newBrand, productIndex, newName, newPrice, imageDataUrl, oldProductName);
        };
        reader.readAsDataURL(imageFile);
    } else {
        // No new image selected, keep existing image
        updateProductWithImage(oldBrand, newBrand, productIndex, newName, newPrice, null, oldProductName);
    }
}

// Helper function to update product with image
function updateProductWithImage(oldBrand, newBrand, productIndex, newName, newPrice, imageDataUrl, oldProductName) {
    let product;
    
    // If brand changed, move product to new brand
    if (oldBrand !== newBrand) {
        if (!productCatalog[newBrand]) {
            productCatalog[newBrand] = [];
        }
        // Remove from old brand
        product = productCatalog[oldBrand].splice(productIndex, 1)[0];
        // Update product details
        product.name = newName;
        product.price = newPrice;
        if (imageDataUrl) {
            product.image = imageDataUrl;
        }
        // Add to new brand
        productCatalog[newBrand].push(product);
        
        // Update productDatabase as well
        if (!productDatabase[newBrand]) {
            productDatabase[newBrand] = { products: [] };
        }
        // Find and remove from old brand in productDatabase
        const dbOldBrand = productDatabase[oldBrand];
        if (dbOldBrand && dbOldBrand.products) {
            const dbIndex = dbOldBrand.products.findIndex(p => p.name === oldProductName);
            if (dbIndex !== -1) {
                const dbProduct = dbOldBrand.products.splice(dbIndex, 1)[0];
                dbProduct.name = newName;
                dbProduct.defaultPrice = newPrice;
                if (imageDataUrl) {
                    dbProduct.image = imageDataUrl;
                }
                productDatabase[newBrand].products.push(dbProduct);
            }
        }
    } else {
        // Update in same brand
        product = productCatalog[oldBrand][productIndex];
        product.name = newName;
        product.price = newPrice;
        if (imageDataUrl) {
            product.image = imageDataUrl;
        }
        
        // Update productDatabase as well
        const dbBrand = productDatabase[oldBrand];
        if (dbBrand && dbBrand.products) {
            const dbIndex = dbBrand.products.findIndex(p => p.name === oldProductName);
            if (dbIndex !== -1) {
                dbBrand.products[dbIndex].name = newName;
                dbBrand.products[dbIndex].defaultPrice = newPrice;
                if (imageDataUrl) {
                    dbBrand.products[dbIndex].image = imageDataUrl;
                }
            }
        }
    }
    
    // Save to localStorage
    localStorage.setItem('productDatabase', JSON.stringify(productDatabase));
    
    document.getElementById('editResult').innerText = '✅ Product updated successfully!';
    setTimeout(() => {
        closeEditModal();
        renderCatalogProducts(); // Refresh the catalog
    }, 1500);
}

// Function to delete product from catalog
function deleteProductFromCatalog(brand, productName) {
    if (!productCatalog[brand]) {
        alert('Brand not found.');
        return;
    }
    
    const productIndex = productCatalog[brand].findIndex(p => p.name === productName);
    if (productIndex === -1) {
        alert('Product not found.');
        return;
    }
    
    // Remove from productCatalog
    productCatalog[brand].splice(productIndex, 1);
    
    // Also remove from productDatabase
    if (productDatabase[brand] && productDatabase[brand].products) {
        const dbIndex = productDatabase[brand].products.findIndex(p => p.name === productName);
        if (dbIndex !== -1) {
            productDatabase[brand].products.splice(dbIndex, 1);
        }
        
        // If brand has no products left in database, remove the brand
        if (productDatabase[brand].products.length === 0) {
            delete productDatabase[brand];
        }
    }
    
    // If brand has no products left in catalog, remove the brand
    if (productCatalog[brand].length === 0) {
        delete productCatalog[brand];
    }
    
    // Save to localStorage
    localStorage.setItem('productDatabase', JSON.stringify(productDatabase));
    
    renderCatalogProducts(); // Refresh the catalog
    alert(`"${productName}" has been deleted from ${brand}.`);
}

// Function to close edit modal
function closeEditModal() {
    const modal = document.querySelector('div[style*="position: fixed"][style*="z-index: 10000"]');
    if (modal) {
        modal.remove();
    }
}

// Function to preview selected image in edit modal
function previewEditImage(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('editImagePreview');
    const noImageText = document.getElementById('noImageText');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            noImageText.style.display = 'none';
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
        noImageText.style.display = 'block';
    }
}
