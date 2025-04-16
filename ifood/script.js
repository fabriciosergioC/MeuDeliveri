// Dados fictícios de restaurantes e menus
const restaurantsData = [
    {
      id: 1,
      name: "Comida Japonesa",
      menu: [
        { id: 1, name: "Sushi", price: 25.99 },
        { id: 2, name: "Temaki", price: 30.99 },
        { id: 3, name: "Hot Roll", price: 28.50 },
        { id: 4, name: "Yakissoba", price: 35.00 },
        { id: 5, name: "Shimeji", price: 22.99 }
      ]
    },
    {
      id: 2,
      name: "Lanche ",
      menu: [
        { id: 1, name: "Hambúrguer", price: 15.99 },
        { id: 2, name: "Batata Frita", price: 8.99 }
      ]
    },

    {
      id: 3,
      name: "Pizza",
      menu: [
        { id: 1, name: "Pizza Margherita", price: 40.00 },
        { id: 2, name: "Pizza Calabresa", price: 42.50 },
        { id: 3, name: "Pizza Quatro Queijos", price: 45.00 },
        { id: 4, name: "Pizza Portuguesa", price: 43.00 },
        { id: 5, name: "Pizza de Frango com Catupiry", price: 44.50 }
      ]
    },

    {
      id: 4,
      name: "Farmácia",
      menu: [
        { id: 1, name: "Paracetamol", price: 5.99 },
        { id: 2, name: "Vitamina C", price: 12.50 },
        { id: 3, name: "Álcool em Gel", price: 8.99 },
        { id: 4, name: "Máscara Descartável (10 unidades)", price: 15.00 },
        { id: 5, name: "Termômetro Digital", price: 25.00 }
      ]
    },

    {
      id: 5,
      name: "Mercado",
      menu: [
        { id: 1, name: "Arroz (1kg)", price: 5.50 },
        { id: 2, name: "Feijão (1kg)", price: 7.99 },
        { id: 3, name: "Óleo de Soja (900ml)", price: 6.50 },
        { id: 4, name: "Açúcar (1kg)", price: 4.20 },
        { id: 5, name: "Café (500g)", price: 12.00 }
      ]
    }
  ];
  
  let cart = [];
  let currentRestaurant = null;
  
  // Função para exibir a lista de restaurantes
  function displayRestaurants() {
    const restaurantList = document.getElementById("restaurant-list");
    restaurantList.innerHTML = "";
    restaurantsData.forEach(restaurant => {
      const li = document.createElement("li");
      li.textContent = restaurant.name;
      li.addEventListener("click", () => showRestaurantDetails(restaurant));
      restaurantList.appendChild(li);
    });
  }
  
  // Função para exibir os detalhes do restaurante
  function showRestaurantDetails(restaurant) {
    currentRestaurant = restaurant;
    const restaurantDetails = document.getElementById("restaurant-details");
    const restaurantName = document.getElementById("restaurant-name");
    const menuList = document.getElementById("menu-list");
  
    restaurantName.textContent = restaurant.name;
    menuList.innerHTML = "";
  
    restaurant.menu.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - R$${item.price.toFixed(2)}`;
      const addButton = document.createElement("button");
      addButton.textContent = "Adicionar ao Carrinho";
      addButton.addEventListener("click", () => addToCart(item));
      li.appendChild(addButton);
      menuList.appendChild(li);
    });
  
    restaurantDetails.style.display = "block";
    document.getElementById("restaurant-list").style.display = "none";
  }
  
  // Função para voltar à lista de restaurantes
  document.getElementById("back-button").addEventListener("click", () => {
    document.getElementById("restaurant-details").style.display = "none";
    document.getElementById("restaurant-list").style.display = "block";
  });
  
  // Função para adicionar item ao carrinho
  function addToCart(item) {
    cart.push(item);
    updateCart();
  }
  
  // Função para atualizar o carrinho
  function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
  
    let total = 0;
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - R$${item.price.toFixed(2)}`;
      cartItems.appendChild(li);
      total += item.price;
    });
  
    cartTotal.textContent = total.toFixed(2);
  }
  
  // Inicialização
  displayRestaurants();