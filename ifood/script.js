
    // Dados dos restaurantes
    const restaurants = [
      {
        id: 1,
        name: "Pizzaria do João",
        description: "As melhores pizzas da cidade",
        menu: [
          { id: 1, name: "Pizza Margherita", description: "Molho de tomate, mussarela, manjericão", price: 35.90 },
          { id: 2, name: "Pizza Pepperoni", description: "Molho de tomate, mussarela, pepperoni", price: 42.90 },
          { id: 3, name: "Pizza Quatro Queijos", description: "Mussarela, parmesão, gorgonzola, provolone", price: 45.90 }
        ]
      },
      {
        id: 2,
        name: "Burger House",
        description: "Hambúrgueres artesanais",
        menu: [
          { id: 4, name: "Classic Burger", description: "Hambúrguer, queijo, alface, tomate", price: 28.90 },
          { id: 5, name: "Bacon Burger", description: "Hambúrguer, bacon, queijo, cebola caramelizada", price: 32.90 },
          { id: 6, name: "Veggie Burger", description: "Hambúrguer vegetal, queijo, rúcula", price: 26.90 }
        ]
      },
      {
        id: 3,
        name: "Sushi Master",
        description: "Culinária japonesa autêntica",
        menu: [
          { id: 7, name: "Combo Sashimi", description: "15 peças de sashimi variados", price: 55.90 },
          { id: 8, name: "Combo Sushi", description: "20 peças de sushi variados", price: 62.90 },
          { id: 9, name: "Temaki Salmão", description: "Salmão, cream cheese, pepino", price: 18.90 }
        ]
      },
      {
        id: 4,
        name: "Doce Sabor",
        description: "Sobremesas e doces",
        menu: [
          { id: 10, name: "Brownie com Sorvete", description: "Brownie de chocolate com sorvete de baunilha", price: 15.90 },
          { id: 11, name: "Cheesecake", description: "Cheesecake de frutas vermelhas", price: 18.90 },
          { id: 12, name: "Açaí na Tigela", description: "Açaí com granola e frutas", price: 22.90 }
        ]
      }
    ];

    // Carrinho de compras
    let cart = [];

    // Elementos do DOM
    const restaurantList = document.getElementById('restaurant-list');
    const restaurantsSection = document.getElementById('restaurants-section');
    const restaurantDetails = document.getElementById('restaurant-details');
    const restaurantName = document.getElementById('restaurant-name');
    const menuList = document.getElementById('menu-list');
    const backButton = document.getElementById('back-button');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    // Inicializar aplicação
    function init() {
      renderRestaurants();
      renderCart();
    }

    // Renderizar lista de restaurantes
    function renderRestaurants() {
      restaurantList.innerHTML = '';
      restaurants.forEach(restaurant => {
        const li = document.createElement('li');
        li.className = 'restaurant-item';
        li.innerHTML = `
          <h3>${restaurant.name}</h3>
          <p>${restaurant.description}</p>
        `;
        li.addEventListener('click', () => showRestaurantDetails(restaurant));
        restaurantList.appendChild(li);
      });
    }

    // Mostrar detalhes do restaurante
    function showRestaurantDetails(restaurant) {
      restaurantsSection.style.display = 'none';
      restaurantDetails.style.display = 'block';
      restaurantName.textContent = restaurant.name;
      
      menuList.innerHTML = '';
      restaurant.menu.forEach(item => {
        const li = document.createElement('li');
        li.className = 'menu-item';
        li.innerHTML = `
          <div class="menu-item-info">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
          </div>
          <div class="menu-item-price">R$ ${item.price.toFixed(2)}</div>
          <button class="add-to-cart" onclick="addToCart(${item.id}, '${item.name}', ${item.price})">
            Adicionar
          </button>
        `;
        menuList.appendChild(li);
      });
    }

    // Voltar para lista de restaurantes
    backButton.addEventListener('click', () => {
      restaurantDetails.style.display = 'none';
      restaurantsSection.style.display = 'block';
    });

    // Adicionar item ao carrinho
    function addToCart(id, name, price) {
      const existingItem = cart.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: id,
          name: name,
          price: price,
          quantity: 1
        });
      }
      
      renderCart();
    }

    // Remover item do carrinho
    function removeFromCart(id) {
      cart = cart.filter(item => item.id !== id);
      renderCart();
    }

    // Renderizar carrinho
    function renderCart() {
      cartItems.innerHTML = '';
      
      if (cart.length === 0) {
        cartItems.innerHTML = '<li class="empty-cart">Carrinho vazio</li>';
        cartTotal.textContent = '0.00';
        checkoutButton.disabled = true;
        return;
      }
      
      let total = 0;
      
      cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <div class="cart-item-price">
              ${item.quantity}x R$ ${item.price.toFixed(2)}
            </div>
          </div>
          <button class="remove-item" onclick="removeFromCart(${item.id})">
            Remover
          </button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
      });
      
      cartTotal.textContent = total.toFixed(2);
      checkoutButton.disabled = false;
    }

    // Finalizar pedido
    function finalizarPedido() {
      if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
      }

      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itens = cart.map(item => `${item.quantity}x ${item.name}`).join('\n');
      
      const confirmacao = confirm(`Confirmar pedido?\n\nItens:\n${itens}\n\nTotal: R$ ${total.toFixed(2)}`);
      
      if (confirmacao) {
        alert('Pedido realizado com sucesso! 🎉\n\nSeu pedido será entregue em aproximadamente 30-45 minutos.\nVocê receberá um SMS com o código de acompanhamento.');
        
        // Limpar carrinho
        cart = [];
        renderCart();
        
        // Voltar para lista de restaurantes se estiver em detalhes
        if (restaurantDetails.style.display === 'block') {
          restaurantDetails.style.display = 'none';
          restaurantsSection.style.display = 'block';
        }
      }
    }

    // Inicializar aplicação
    init();
