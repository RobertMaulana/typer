Typer Problem   

Kita mencari developer yang mandiri, ketika ada masalah, aktif mencari solusi dengan sendirinya dan mudah mengerti instruksi tanpa terlalu banyak menanyakan untuk memahami instruksi.     
Berikut adalah aplikasi Javascript yang simple.    
Kami tidak akan menjelaskan bagaimana cara kerjanya atau library apa yang dipakai.   

Pertanyaan:   
1. Sebutkan library apa saja yang dipakai, website library itu dimana, dan dokumentasi library itu ada dimana.    

    | Plugin | DOC | Official
    | ------ | ------ | ------ |
    | jQuery | [jQuery](http://api.jquery.com/) | https://jquery.com/
    | jQuery UI | [jQuery UI](http://api.jqueryui.com/) | https://jqueryui.com/
    | UnderscoreJS | [UnderscoreJS](http://underscorejs.org/) | http://underscorejs.org/
    | BackboneJS | [BackboneJS](http://backbonejs.org/) | http://backbonejs.org/
    | Bootstrap | [Bootstrap](http://getbootstrap.com/getting-started/) | http://getbootstrap.com/

    ##### Commit log: 0da42af
2. Aplikasi itu 'laggy'. Kenapa? Bagaimana cara membuat animasi lebih 'smooth'?    
    * Aplikasi laggy aplikasi tidak memaksimalkan fps diberikan daripada display. oleh karena itu, saya ubah delay jadi " 2dtk/60fps " dan menambahkan fungsi bawaan javascript untuk handle animasi " requestAnimationFrame ". Sebenarnya untuk animasi kita tidak disarankan memakai setInterval / setTimeout. Tapi untuk kasus simple, cukup saya tambahkan requestAnimationFrame callback saja.
    ##### Commit log: 0a5381e
3. Aplikasi itu tidak akan jalan di salah satu 3 browser populer (Chrome, Firefox, Internet Explorer)? Kenapa? Solusinya hanya menghapus satu character di code, character yang mana?
    * Sebelum masuk ke character mana yang dihapus, saya mencari info terlebih dahulu tentang hal ini dan akhirnya saya baca di situs developer mozilla [[Trailing commas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas)]. Disana dijelaskan bahwa untuk trailing commas terletak di object literal dan functions. Jadi saya cari object literal yang menuju Model Typer default object (Kita hanya perlu menghapus comma yang ada di key value yang terakhir dari object tersebut). Akan tetapi perlu digaris bawahi, Sejak IE versi 9 keluar, trailing commas sudah tidak menjadi masalah lagi di IE alias sudah sembuh. Tapi untuk IE 9 kebawah hal ini akan bermasalah.
    ##### Commit log: 730b963
4. Implementasikan tombol Start, Stop, Pause, dan Resume.
    ##### Commit log: c45847e
5. Ketika ukuran window dirubah, susunan huruf yang 'terbentur' batas window menjadi tidak 1 baris. Benarkan.
    ##### Commit log: c45847e
6. Implementasikan sistem score.  
    * +5 jika benar setiap kata nya
    ##### Commit log: c45847e
7. Implementasikan hukuman berupa pengurangan nilai bila salah ketik.
    * -1 jika salah input / karakter
    ##### Commit log: c45847e
