---
title: Laravel Restful API using Docker in three steps (Part II)
description: "In this post series we will see how to build a Laravel Restful application. In addition we will see the basic functionalities of **Eloquent ORM**, tinker db queries and some relationships between Models."
tags: [Back-end, Docker]
keys: [Docker, Laravel, PHP]
date: 2018-11-03
author:
cover: /images/posts/bg_master_head.jpeg
fullscreen: true
---

In this post we will see how to use the **Eloquent ORM** relationships between Models and Tinker to queries some data from database.

> This post was inspired by the book: [Hands-On Full Stack Web Development with Angular 6 and Laravel 5](https://www.packtpub.com/web-development/hands-full-stack-web-development-angular-6-and-laravel-5), from [Fernando Monteiro](http://newaeonweb.com.br/about/), released on July/2018 by [Packt](https://www.packtpub.com/).

![hands-full-stack-web-development-angular-6-and-laravel-5](/images/posts/fullstack-angular-laravel-docker.png)

This post is the second part from: [Part I](/laravel-restful-api-using-docker-in-three-steps/).
On the first part we created the baseline Docker configuration and install a new Laravel application, also we saw how to setup the database credentials and how to create migrations file and seed the database with sample data.

## 2 - Eloquent ORM and relationship between Models.
Eloquent is the ORM (Object Relational Mapping) that is behind the database queries of Laravel. It's an abstraction of **Active Record** implementation.

As we saw previously each application **Model** has a respective **Table** in our database. With this, we can queries, insert, delete and update records.

The Eloquent ORM use the "snake case", plural name of the class will be used as the table name unless another name is explicitly specified, for example our **Band Model Class** has it's table **bands** as we can see on table migration file:

```php

// server/app/Band.php

class Band extends Model
{
    protected $fillable = [
        'name',
        'country',
        'genre'
    ];
}

```

```php

// server/database/migrations/<date>create_bands_table.php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBandsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bands', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('name');
            $table->string('country');
            $table->string('genre');
        });
    }

```

The Eloquent ORM support the following relationship between models:

* One to one
* One to many
* One to many - inverse = belongs_to
* Many to many
* Has Many Through
* Polymorphic Relations
* Many To Many Polymorphic Relations

> You can read more about **Eloquent ORM** relationship at [chapter 5 - Creating a Restful API using Laravel Framework (Part I)](https://github.com/newaeonweb/Hands-On-Full-Stack-Web-Development-with-Angular-6-and-Laravel-5#chapter-5-creating-a-restful-api-using-laravel-framework-part-i).

## Creating a new Model, migration file and database seed.
So it is time to create another Model, since on our first post we just created only one Model called Band we need another one to create a relationship between both Models. As for this basic example we will create a Model called: `Album`. Let's see.

* Inside your project folder, type the following command: `docker-compose up -d` to start the Docker.
* Go inside the **php-fpm** bash using the following command: `docker-compose exec php-fpm bash`.
* Now using the following command to create a new Model: `php artisan make:model Album -m`.
* Open `server/app/Album.php` and add the following code inside the **Album** class:

```php

    protected $fillable = [
      'title',
      'year',
      'band_id'
    ];

```

**Note the `band_id` property, later on this tutorial we will use this property to make our relationship between Models**

Now it is time to edit the migration file and add the database seed too.

* Inside: `server/database/data-sample` create a new file called: `albums.json` and add the following content:

```php

  [{
    "id": 1,
    "title": "March or Die",
    "year": "1992",
    "band_id": 1
  }, {
    "id": 2,
    "title": "Reign in Blood",
    "year": "1996",
    "band_id": 2
  }, {
    "id": 3,
    "title": "Gravity",
    "year": "2006",
    "band_id": 3
  }]

```

* Open: `server/database/migrations/####_##_##_######_create_albums_table.php` and add the following code inside the **up()** function:

```php

  $table->string('title');
  $table->string('year');
  $table->integer('band_id');

```            

* Now it's time to create our seed file, on your Terminal window type the following command:

```
  php artisan make:seeder AlbumsTableSeeder
```

The previous command added a new file called: **AlbumsTableSeeder.php** inside: `server/database/seeds` folder.

* Open `server/database/seeds/AlbumsTableSeeder.php` and replace the code for the following block of code:

```php

  use Illuminate\Database\Seeder;
  use App\Album;

  class AlbumsTableSeeder extends Seeder
  {
      /**
       * Run the database seeds.
       *
       * @return void
      */
      public function run()
      {
          DB::table('albums')->delete();
          $json = File::get("database/data-sample/albums.json");
          $data = json_decode($json);
          foreach ($data as $obj) {
            Album::create(array(
                'id' => $obj->id,
                'title' => $obj->title,
                'year' => $obj->year,
                'band_id' => $obj->band_id
            ));
          }
      }
  }

```

Open `server/database/seeds/DatabaseSeeder.php` and add the following line of code, right after the `BandsTableSeeder` comment:

```php
  $this->call(AlbumsTableSeeder::class);
```

## Relation between Album and Band Models.

### One-to-many relationship

The one-to-many will be applied to Band to Albums, this means that one Band will have many Albums. 
Let's add the **one-to-many** relationship between **Album** and **Band** model.

Open: `server/app/Band.php` and add the following code, righ after the `protected $fillable` array:

```php

  public function albums() {
    return $this->hasMany('App\Album');
  }
```

Now open `server/app/Album.php` and add the following code righ after the `protected $fillable` array:

```php

  public function band() {
      return $this->belongsTo('App\Band');
  }

```

The previous code means that one Album belongs to one Band.

So now it is time migrate the new Model schema and generate our seed.

Open your Terminal window and type the following command:

```
php artisan migrate
```

The result of previous command will be similar to the following lines:

```console

root@155ee441c74a:/application# php artisan migrate
Migration table created successfully.
Migrating: ####_##_##_######_create_users_table
Migrated:  ####_##_##_######_create_users_table
Migrating: ####_##_##_######_create_password_resets_table
Migrated:  ####_##_##_######_create_password_resets_table
Migrating: ####_##_##_######_create_bands_table
Migrated:  ####_##_##_######_create_bands_table
Migrating: ####_##_##_######_create_albums_table
Migrated:  ####_##_##_######_create_albums_table

```

Now still on your Terminal window, type the following command to create our seed.

```
php artisan db:seed
```

## Querying Database using Tinker.

Tinker is a command line application that allows you to interact with your Laravel application, including the Eloquent ORM, jobs, events, and more. To get access to Tinker console, run the tinker Artisan command that we previously used to check database connection on first post.

Open your Terminal window and type the following command:

```
  php artisan tinker
```

Since we have not created any controller or routes for our application, we still can not access our records using the browser, however using Tinker it is possible to interact with our database and check if everything went well with our migration files and database seed.

Let's go to the **bands** table and make sure everything is set up correctly. Using a command to get all records from bands table.

Still on your Terminal and inside tinker console, type the following command:

```php

  DB::table('bands')->get();
```

The result on your Terminal window will be similar to:

```console
>>> DB::table('bands')->get();
=> Illuminate\Support\Collection {#2863
     all: [
       {#2869
         +"id": 1,
         +"created_at": "<date>",
         +"updated_at": "<date>",
         +"name": "Motorhead",
         +"country": "England",
         +"genre": "Heavy Metal",
       },
       {#2872
         +"id": 2,
         +"created_at": "<date>",
         +"updated_at": "<date>",
         +"name": "Slayer",
         +"country": "USA",
         +"genre": "Thrash Metal",
       },
       {#2873
         +"id": 3,
         +"created_at": "<date>",
         +"updated_at": "<date>",
         +"name": "Truckfighters",
         +"country": "Sweeden",
         +"genre": "Stoner",
       },
     ],
   }
>>>

```

Now let's try to get just one records by a specific ID:

```php
  Band::where('id', '=', 2)->get();
```

The output from the previous command will be similar to the following block:

```console
>>> Band::where('id', '=', 2)->get();
[!] Aliasing 'Band' to 'App\Band' for this Tinker session.
=> Illuminate\Database\Eloquent\Collection {#2874
     all: [
       App\Band {#2875
         id: 2,
         created_at: "<date>",
         updated_at: "<date>",
         name: "Slayer",
         country: "USA",
         genre: "Thrash Metal",
       },
     ],
   }
>>>
```

Note that we can repeat the previous steps with **Album** Model to get na Album list and get a specific Album by ID.

Now let's check our Model relationship. Still on your Terminal window, type the following command:

```php
  Band::with('albums')->get();
```

> If you receive an error from the previous querie, inside the **tinker** bash, is recommend to re-create the sample data. Type `exit` inside the bash and type the following command: `php artisan migrate:refresh --seed`. The `migrate:refresh` command will remove all previous migrations and then execute the `migrate` command again. This command effectively re-creates the entire database.

So you should see the following output on your Terminal window:

```console
>>> Band::with('albums')->get();
=> Illuminate\Database\Eloquent\Collection {#2871
     all: [
       App\Band {#2887
         id: 1,
         created_at: "<date>",
         updated_at: "<date>",
         name: "Motorhead",
         country: "England",
         genre: "Heavy Metal",
         albums: Illuminate\Database\Eloquent\Collection {#2891
           all: [
             App\Album {#2897
               id: 1,
               created_at: "<date>",
               updated_at: "<date>",
               title: "March or Die",
               year: "1992",
               band_id: 1,
             },
           ],
         },
       },
       App\Band {#2888
         id: 2,
         created_at: "<date>",
         updated_at: "<date>",
         name: "Slayer",
         country: "USA",
         genre: "Thrash Metal",
         albums: Illuminate\Database\Eloquent\Collection {#2886
           all: [
             App\Album {#2899
               id: 2,
               created_at: "<date>",
               updated_at: "<date>",
               title: "Reign in Blood",
               year: "1996",
               band_id: 2,
             },
           ],
         },
       },
       App\Band {#2889
         id: 3,
         created_at: "<date>",
         updated_at: "<date>",
         name: "Truckfighters",
         country: "Sweeden",
         genre: "Stoner",
         albums: Illuminate\Database\Eloquent\Collection {#2892
           all: [
             App\Album {#2900
               id: 3,
               created_at: "<date>",
               updated_at: "<date>",
               title: "Gravity",
               year: "2006",
               band_id: 3,
             },
           ],
         },
       },
     ],
   }
>>>
```

Note that each Band have only one Album, let's see how to insert another Album for Motorhead band.

Inside the **tinker** bash, type the following command:

```php
DB::table('albums')->insert(
    ['title' => 'Aces of Spades', 'year' => '1980', 'band_id' => 1]
);
```

Now when we repeat the command: `Band::with('albums')->get();` we will see the following output:

```console
>>> Band::with('albums')->get();=> Illuminate\Database\Eloquent\Collection {#2900     all: [
       App\Band {#2906
         id: 1,
         created_at: "<date>",
         updated_at: "<date>",
         name: "Motorhead",
         country: "England",
         genre: "Heavy Metal",
         albums: Illuminate\Database\Eloquent\Collection {#2890
           all: [
             App\Album {#2873
               id: 1,
               created_at: "<date>",
               updated_at: "<date>",
               title: "March or Die",
               year: "1992",
               band_id: 1,
             },
             App\Album {#2902
               id: 4,
               created_at: null,
               updated_at: null,
               title: "Aces of Spades",
               year: "1980",
               band_id: 1,
             },
           ],
         },
       },
```

Also we can limit our queries using the `has` method. Let's see a basic example but first we need to delete a band from our database.

Still on **tinker** bash, type the following command:

```php
DB::table('bands')->where('id', '=', 3)->delete();
```

Note that we are mixing the commands: `DB::table()->` with `Moldel::` you can use both ways.

`DB::table('bands')->where('id', '=', 3)->delete();` or `Band::where('id', '=', 3)->delete();`

Now it is time to use the `has` method.

Type the following command on your Terminal window:

```php
Album::has('band')->get();
```

The output on your Terminal window will be the following:

```console

>>> Album::has('band')->get();
=> Illuminate\Database\Eloquent\Collection {#2885
     all: [
       App\Album {#2904
         id: 1,
         created_at: "<date>",
         updated_at: "<date>",
         title: "March or Die",
         year: "1992",
         band_id: 1,
       },       App\Album {#2876
         id: 2,
         created_at: "<date>",
         updated_at: "<date>",
         title: "Reign in Blood",
         year: "1996",
         band_id: 2,
       },
       App\Album {#2873
         id: 4,
         created_at: null,
         updated_at: null,
         title: "Aces of Spades",
         year: "1980",
         band_id: 1,
       },
     ],
   }
>>>

``` 

**Note that on the previous output we just have 3 records instead of 4, because the `has` method was used in this queries**.

So let's check the complete result without this filter. On your Terminal window type the following command:

```php

DB::table('albums')->get();
``` 

Te result from the previous command will be the following:

```console

>>> DB::table('albums')->get()=> Illuminate\Support\Collection {#2863     all: [
       {#2866
         +"id": 1,
         +"created_at": "2018-11-03 14:30:45",
         +"updated_at": "2018-11-03 14:30:45",
         +"title": "March or Die",
         +"year": "1992",
         +"band_id": 1,
       },
       {#2868
         +"id": 2,
         +"created_at": "2018-11-03 14:30:45",
         +"updated_at": "2018-11-03 14:30:45",
         +"title": "Reign in Blood",
         +"year": "1996",
         +"band_id": 2,
       },
       {#2864
         +"id": 3,
         +"created_at": "2018-11-03 14:30:45",
         +"updated_at": "2018-11-03 14:30:45",
         +"title": "Gravity",
         +"year": "2006",
         +"band_id": 3,
       },
       {#2865
         +"id": 4,
         +"created_at": null,
         +"updated_at": null,
         +"title": "Aces of Spades",
         +"year": "1980",
         +"band_id": 1,
       },
     ],
   }

>>>

```

Now we can see all the results from Album table.

> This post was inspired by the book: [Hands-On Full Stack Web Development with Angular 6 and Laravel 5](https://www.packtpub.com/web-development/hands-full-stack-web-development-angular-6-and-laravel-5), from [Fernando Monteiro](http://newaeonweb.com.br/about/), released on July/2018 by [Packt](https://www.packtpub.com/).

Continues on the next post...
