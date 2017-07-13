Typer Problem   

Kita mencari developer yang mandiri, ketika ada masalah, aktif mencari solusi dengan sendirinya dan mudah mengerti instruksi tanpa terlalu banyak menanyakan untuk memahami instruksi.     
Berikut adalah aplikasi Javascript yang simple.    
Kami tidak akan menjelaskan bagaimana cara kerjanya atau library apa yang dipakai.   

Pertanyaan:   
1. Sebutkan library apa saja yang dipakai, website library itu dimana, dan dokumentasi library itu ada dimana.    
  * jQuery - https://jquery.com/ - doc[[jQuery](http://api.jquery.com/)]
  * jQuery UI - https://jqueryui.com/ - doc[[jQuery UI](http://api.jqueryui.com/)]
  * UnderscoreJS - http://underscorejs.org/ - doc[[UnderscoreJS](http://underscorejs.org/)]
  * BackboneJS - http://backbonejs.org/ - doc[[BackboneJS](http://backbonejs.org/)]
  * Bootstrap - http://getbootstrap.com/ - doc[[Bootstrap](http://getbootstrap.com/getting-started/)]
  ##### Commit log: 0da42af
2. Aplikasi itu 'laggy'. Kenapa? Bagaimana cara membuat animasi lebih 'smooth'?    
  * aplikasi laggy aplikasi tidak memaksimalkan fps diberikan daripada display. oleh karena itu, saya ubah delay jadi " 2dtk/60fps " dan menambahkan fungsi bawaan javascript untuk handle animasi " requestAnimationFrame ". Sebenarnya untuk animasi kita tidak disarankan memakai setInterval / setTimeout. Tapi untuk kasus simple, cukup saya tambahkan requestAnimationFrame callback saja.
  ##### Commit log: 0a5381e
3. Aplikasi itu tidak akan jalan di salah satu 3 browser populer (Chrome, Firefox, Internet Explorer)? Kenapa? Solusinya hanya menghapus satu character di code, character yang mana?    
4. Implementasikan tombol Start, Stop, Pause, dan Resume.   
5. Ketika ukuran window dirubah, susunan huruf yang 'terbentur' batas window menjadi tidak 1 baris. Benarkan.    
6. Implementasikan sistem score.   
7. Implementasikan hukuman berupa pengurangan nilai bila salah ketik.
