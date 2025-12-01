document.addEventListener("alpine:init", () => {
  Alpine.data("product", () => ({
    items: [
      {
        id: 1,
        name: "Paris Premium",
        img: "pp.jpg",
        price: 20000,
        description:
          "Paris Premium hadir dengan bahan yang lembut, ringan, dan mudah menyerap keringat. Teksturnya halus dan nyaman dipakai seharian, membuatnya cocok untuk aktivitas harian maupun acara santai. Materialnya mudah dibentuk, tidak licin, dan tetap rapi digunakan sepanjang hari.",
      },
      {
        id: 2,
        name: "Paris Jadul",
        img: "pj.jpg",
        price: 15000,
        description:
          "Paris Jadul menawarkan tampilan klasik dengan bahan yang tipis, breathable, dan ringan. Memiliki karakter kain yang mudah dibentuk sehingga memberikan tampilan natural dan effortless. Cocok untuk pengguna yang menyukai gaya simple dan timeless.",
      },
      {
        id: 3,
        name: "Bella Square Premium",
        img: "bp.jpg",
        price: 20000,
        description:
          "Bella Square Premium memiliki bahan yang lembut, halus, dan adem saat dipakai. Kainnya sedikit kaku sehingga mudah diatur dan memberikan hasil yang lebih bervolume. Cocok untuk tampilan yang sopan, rapi, dan fashionable di berbagai kesempatan.",
      },
      {
        id: 4,
        name: "Pashmina Kaos",
        img: "pk.jpg",
        price: 40000,
        description:
          "Pashmina Kaos dibuat dari bahan kaos yang sangat nyaman, lentur, dan jatuh saat dipakai. Bahannya tidak panas, mudah menyerap keringat, serta praktis digunakan tanpa perlu banyak jarum. Pilihan sempurna untuk aktivitas santai atau harian yang membutuhkan kenyamanan maksimal.",
      },
      {
        id: 5,
        name: "Pashmina Viscose",
        img: "pv.jpg",
        price: 45000,
        description:
          "Pashmina Viscose memiliki tekstur ringan, lembut, dan flowy sehingga mudah dibentuk menjadi berbagai gaya. Bahannya adem dan memberikan tampilan elegan yang cocok untuk acara formal maupun kasual. Cocok untuk kamu yang suka tampilan rapi dan feminin.",
      },
      {
        id: 6,
        name: "Segiempat Motif",
        img: "jm.jpg",
        price: 35000,
        description:
          "Segiempat Motif hadir dengan desain motif cantik yang memberikan sentuhan stylish dan unik pada penampilan. Terbuat dari bahan nyaman, tidak panas, dan mudah dibentuk. Ideal untuk kamu yang ingin tampil menonjol namun tetap elegan dalam setiap kesempatan.",
      },
    ],
    modalItem: {},
    showModal: false,
  }));
});

document.addEventListener("alpine:init", () => {
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,

    // ADD ITEM KE CART
    add(newItem) {
      const existingItem = this.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) return item;

          item.quantity++;
          item.total = item.price * item.quantity;
          this.quantity++;
          this.total += item.price;
          return item;
        });
      }
    },

    // REMOVE ITEM DARI CART
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (!cartItem) return;

      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) return item;

          item.quantity--;
          item.total = item.price * item.quantity;
          this.quantity--;
          this.total -= item.price;
          return item;
        });
      } else {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

// FORM CHECKOUT KE WHATSAPP
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkoutForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    if (!name || !phone) {
      alert("Nama dan nomor whatsapp wajib diisi!");
      return;
    }

    // Nomor WhatsApp Toko
    const waNumber = "6283865643442"; // GANTI DENGAN NOMOR TOKO

    // Ambil data produk dari keranjang
    let cartText = "";
    $store.cart.items.forEach((item) => {
      cartText += `- ${item.name} (${item.quantity}x) = ${rupiah(
        item.total
      )}\n`;
    });

    const total = rupiah($store.cart.total);

    // Pesan WhatsApp
    const message =
      `*DETAIL ORDERAN*\n\n` +
      `Nama: ${name}\n` +
      `Email: ${email}\n` +
      `No WA: ${phone}\n\n` +
      `*Produk Yang Dipesan:*\n` +
      `${cartText}\n` +
      `*Total: ${total}*\n\n` +
      `Terima kasih sudah berbelanja ❤️`;

    // Encode pesan agar terbaca di URL
    const encodedMessage = encodeURIComponent(message);

    // Redirect ke WhatsApp
    window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, "_blank");
  });
});
