---
title: Laravel Restful API using Docker in three steps (Part III)
description: "In this post series we will see how to build a Laravel Restful application. In addition we will see the basic functionalities of **Resources**"
tags: [Back-end, Docker]
date: 2018-12-09
author:
cover: /images/posts/bg_master_head.jpeg
fullscreen: true
---


In this post series we will see how to build a Laravel Restful application. In addition we will see the basic functionalities of **Resources**, a pretty easy way to create JSON files.


> This post was inspired by the book: [Hands-On Full Stack Web Development with Angular 6 and Laravel 5](https://www.packtpub.com/web-development/hands-full-stack-web-development-angular-6-and-laravel-5), from [Fernando Monteiro](http://newaeonweb.com.br/about/), released on July/2018 by [Packt](https://www.packtpub.com/).

![hands-full-stack-web-development-angular-6-and-laravel-5](/images/posts/fullstack-angular-laravel-docker.png)

## Creating Controllers and API Routes
We finally almost there, we have a few steps to finish our API yet. Now is time to create the API controller and API route.
With the new version (5.6) from Laravel we have a new command available to do this task, is the **--api** flag. Let's see how it works in practice.

Open your Terminal window and type the following command:

```
php artisan make:controller API/BandController --api
```

**Note the --api flag create four methods(CRUD) for us inside the BandController class**:

*  `index()` Function using the **GET** Method
*  `store()` Function using the **POST** Method
*  `show($id)` Funtion using the **GET** Method
*  `update(Request $request, $id)` Funtion using the **PUT** Method
*  `destroy($id)` Funtion using the **POST** Method


Open `project/app/Http/Controllers/API/BandController.php` and add the following code right after the Controller import:

```
use App\Band;
```

Now let's add the content for each method. Still on `project/app/Http/Controllers/API/BandController.php` replace the content for the following code:


```php
public function index()
    {
        //
        $listBands = Band::all();
        return $listBands;
    }
```

```php
public function store(Request $request)
    {
        //
        $createBand = Band::create($request->all());
        return  $createBand;
    }
```

```php
public function show($id)
    {
        //
        $band = Band::findOrFail($id);
        return $band;
    }
```

> Note on the previous block of code the use of `findOrFail()` function instead of `find()`, make a search and discovery the difference between both functions.

```php
public function update(Request $request, $id)
    {
        //
        $updateBandById = Band::findOrFail($id);
        $updateBandById->update($request->all());
        return $updateBandById;
    }
```

```php
public function destroy($id)
    {
        //
        $deleteBandById = Band::find($id)->delete();
        return response()->json([], 204);
    }
```

## Creating the API Routes
Now it is time to create the API route. We are using the new feature of apiResource.

Open `project/routes/api.php` and add the following code:

```php
Route::apiResources([
  'bands' => 'API\BandController'
]);
```

Simple no? Now we have the controller and the API route.

## Dealing with Laravel Resource
In some previous versions of Laravel it was possible to use a feature called Fractal JSON, results, but with this new version of Laravel the Resource feature became very powerful for this purpose.

In this session we'll see how we can use this feature to take advantage, so we can get the most out of our API. A Resource class is a way to transform data from one format to another.

When dealing with resources and how to transform them into responses for the client we basically have 2 types, an item and a collection. An item resource as you might have guessed is basically a one to one representation of our model where as a collection is the representation of many items. Collections may also have meta data and other navigation information as will see later in this section.

### Creating Band Resource
So let's create our first Resource.

Open your Terminal window and type the following command:

```
php artisan make:resource Band
```

The previous command will generated the following file: `App\Http\Resource\BandResource.php`

Open `App\Http\Resource\BandResource.php` and add the following code, inside the `toArray($request)` function:
  

```php
return [
  'id' => $this->id,
  'name' => $this->name,
  'country' => $this->country,
  'genre' => $this->genre,
  'albums' => $this->albums,
  'created_at' => (string) $this->created_at,
  'updated_at' => (string) $this->updated_at
];
```

**Note that we are including the relationship between Album and Band model, in our Array function.**

> We recommend to running the `composer dump-autoload -o` every time you make some migration and seed changes.

Now it's time to use the new trick available.

## Refactoring Band Controller to use Band Resource.

Before we proceed with the refactoring, let's see how our API looks. Remember you must have the Docker container up and running.

Inside the project root folder, type the following command:

```
docker-compose up -d
```

Go inside the PHP bash using the following command:

```
docker-compose exec php-fpm bash
```

Go to `http://localhost:8081/api/bands` you will see the following result:

```json
// http://localhost:8081/api/bands

[
  {
    "id": 1,
    "created_at": "2018-11-03 14:30:45",
    "updated_at": "2018-11-03 14:30:45",
    "name": "Motorhead",
    "country": "England",
    "genre": "Heavy Metal"
  },
  {
    "id": 2,
    "created_at": "2018-11-03 14:30:45",
    "updated_at": "2018-11-03 14:30:45",
    "name": "Slayer",
    "country": "USA",
    "genre": "Thrash Metal"
  }
]
```

**Note that we don't have any Albums here.**

Open `project/app/Http/Controllers/API/BandController.php` replace the content of `index()` function for the following code:

```php
public function index()
    {
        //
        $listBands = Band::all();
        return BandResource::collection(Band::with('albums')->paginate(10));
    }
```

Now let's see how the JSON result will looks like.

Go to `http://localhost:8081/api/bands` you will see the following result:

```json
// http://localhost:8081/api/bands

{
  "data": [
    {
      "id": 1,
      "name": "Motorhead",
      "country": "England",
      "genre": "Heavy Metal",
      "albums": [
        {
          "id": 1,
          "created_at": "2018-11-03 14:30:45",
          "updated_at": "2018-11-03 14:30:45",
          "title": "March or Die",
          "year": "1992",
          "band_id": 1
        },
        {
          "id": 4,
          "created_at": null,
          "updated_at": null,
          "title": "Aces of Spades",
          "year": "1980",
          "band_id": 1
        }
      ],
      "created_at": "2018-11-03 14:30:45",
      "updated_at": "2018-11-03 14:30:45"
    },
    {
      "id": 2,
      "name": "Slayer",
      "country": "USA",
      "genre": "Thrash Metal",
      "albums": [
        {
          "id": 2,
          "created_at": "2018-11-03 14:30:45",
          "updated_at": "2018-11-03 14:30:45",
          "title": "Reign in Blood",
          "year": "1996",
          "band_id": 2
        }
      ],
      "created_at": "2018-11-03 14:30:45",
      "updated_at": "2018-11-03 14:30:45"
    }
  ],
  "links": {
    "first": "http://localhost:8081/api/bands?page=1",
    "last": "http://localhost:8081/api/bands?page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "path": "http://localhost:8081/api/bands",
    "per_page": 10,
    "to": 2,
    "total": 2
  }
}
```

Great! Now we have a new JSON result, also including meta data and pagination.

We have reached the end of our Restful API trilogy with Laravel framework, You can get much more content in the Book quoted in all our posts.

Later in the blog we will add more content on the web development, stay connected.
