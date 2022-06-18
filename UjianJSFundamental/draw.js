class Draw {
  GambarKotak(kotak) {
    for (let x = 0; x < kotak; x++) {
      for (let y = 0; y < kotak; y++) {
        process.stdout.write("*");
      }
      console.log(" ");
    }
  }

  GambarSegitiga(segitiga) {
    for (let x = 0; x < segitiga; x++) {
      for (let y = 0; y <= x; y++) {
        process.stdout.write("*");
      }
      console.log(" ");
    }
  }

  GambarSegitigaTerbalik(segitigaTerbalik) {
    for (let x = segitigaTerbalik; x > 0; x--) {
      for (let y = x; y > 0; y--) {
        process.stdout.write("*");
      }
      console.log(" ");
    }
  }

  GambarSelangSeling(selangSeling) {
    let nilai = 0;
    for (let x = 0; x < selangSeling; x++) {
      for (let y = 0; y < selangSeling; y++) {
        nilai = nilai + 1;
        if (nilai % 2 == 0) {
          process.stdout.write("!");
        } else {
          process.stdout.write("*");
        }
      }
      console.log(" ");
    }
  }

  GambarKotakPola(kotakPola) {
    for (let x = 0; x < kotakPola; x++) {
      for (let y = 0; y < kotakPola; y++) {
        if ((x % 2 == 0 && y == 2) || (x % 2 == 1 && y == 1)) {
          process.stdout.write("*");
        } else {
          process.stdout.write("!");
        }
      }
      console.log(" ");
    }
  }
}
let kotak = new Draw();
console.log("Gambar Kotak");
kotak.GambarKotak(5);

let segitiga = new Draw();
console.log("Gambar Segitiga");
segitiga.GambarSegitiga(5);

let segitigaTerbalik = new Draw();
console.log("Gambar Segitiga Terbalik");
segitigaTerbalik.GambarSegitigaTerbalik(5);

let selangSeling = new Draw();
console.log("Gambar Selang Seling");
selangSeling.GambarSelangSeling(5);

let kotakPola = new Draw();
console.log("Gambar Kotak Pola");
kotakPola.GambarKotakPola(5);
