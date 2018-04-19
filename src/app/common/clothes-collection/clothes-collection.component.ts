import { Config } from './../../config';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ProductsService, CallOperator } from './../../services/products.service';
import { PageType } from './../common-header/common-header.component';
import { Product } from './../Product';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Price } from '../Price';

@Component({
  selector: 'app-clothes-collection',
  templateUrl: './clothes-collection.component.html',
  styleUrls: ['./clothes-collection.component.scss']
})
export class ClothesCollectionComponent implements OnInit {
  @BlockUI('block-products') blockUIProducts: NgBlockUI;

  private type: PageType;
  collectionHeader;

  brandControl = new FormControl();
  brandsList = ['Asics', 'Bertoni', 'Dale Of Norway', 'Diesel Men', 'Edwin', 'G-Star', 'GANT', 'GANT Rugger', 'Boss'];

  materialControl = new FormControl();
  materialsList = ['Leather', 'Coton', 'Wool', 'Cashmere', 'Silk', 'Polyster', 'Nylon', 'Windproof', 'Water resistant'];

  sizeControl = new FormControl();
  sizeGroups = [
    {
      name: 'Small',
      size: ['XS', 'S']
    }, {
      name: 'Medium',
      size: ['M']
    }, {
      name: 'Large',
      size: ['L', 'XL', 'XXL', 'XXL']
    }

  ];

  colorControl = new FormControl();
  colorsList = [
    {
      name: 'Black',
      code: '#000000'
    }, {
      name: 'Blue',
      code: '#0000FF'
    }, {
      name: 'Gray',
      code: '#A4A4A4'
    }, {
      name: 'White',
      code: '#FFFFFF'
    }, {
      name: 'Brown',
      code: '#8A2908'
    }, {
      name: 'Red',
      code: '#FF0000'
    }, {
      name: 'Green',
      code: '#2EFE2E'
    }, {
      name: 'Orange',
      code: '#FF8000'
    }];

  priceCurrency = "kr";
  minPrice = "0";
  maxPrice = "5000";
  priceRange = "1350, 3500";
  perPage;
  sortingOption = "";

  topsCollection = ['Shirts', 'T-Shirts', 'Knitwear', 'Weatshirts & Hoodies', 'Polo Shirts']
  outerwareCollection = ['Jackets', 'Coats', 'Blazers', 'Rainwear', 'Vests']
  suitsCollection = ['Suits', 'Tuxedos', 'Blazers', 'Trousers', 'Waistcoats', 'Accessories']
  trousersCollection = ['Chinos', 'Casual', 'Formal', 'Sweat Pants']
  jeansCollection = ['Skinny', 'Slim', 'Regular', 'Relaxed']

  products: Product[] = []; //
  errorMessage = {
    text: "",
    class: ""
  };

  returnPageUrl: string;
  returnSubPageUrl: string;

  constructor(private route: ActivatedRoute, private productService: ProductsService, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let type = params.get('type');
      this.type = (type) ? PageType[type.charAt(0).toUpperCase() + type.substr(1).toLowerCase()] : null;
      switch (this.type) {
        case PageType.Men:
          this.returnPageUrl = "clothes-collection";
          this.returnSubPageUrl = "men"
          this.collectionHeader = "url('../../assets/img/collection/men/banner_1.jpg')";
          this.getAllProducts();
          // this.loadProducts([
          //   {
          //     "type": "product",
          //     "id": "c0802b48-8f95-41da-b979-a3f555140784",
          //     "name": "Maasai o-n 9670",
          //     "slug": "SAMM_18122304",
          //     "sku": "SAMM_18122304",
          //     "manage_stock": true,
          //     "description": "Fit: Regular\nMaterial: 100% cotton.\nCrew neck\nRibbed knit texture pattern\nContrast trim\nFine wash at max. 30˚C",
          //     "price": [
          //       {
          //         "amount": 990,
          //         "currency": "SEK",
          //         "includes_tax": true
          //       }
          //     ],
          //     "status": "live",
          //     "commodity_type": "physical",
          //     "meta": {
          //       "timestamps": {
          //         "created_at": "2018-04-14T10:58:02+00:00",
          //         "updated_at": "2018-04-14T18:03:24+00:00"
          //       },
          //       "display_price": {
          //         "with_tax": {
          //           "amount": 990,
          //           "currency": "SEK",
          //           "formatted": "990 kr"
          //         },
          //         "without_tax": {
          //           "amount": 990,
          //           "currency": "SEK",
          //           "formatted": "990 kr"
          //         }
          //       },
          //       "stock": {
          //         "level": 5,
          //         "availability": "in-stock"
          //       }
          //     },
          //     "relationships": {
          //       "files": {
          //         "data": [
          //           {
          //             "type": "file",
          //             "id": "47327a7b-3c3b-4ba6-b164-3a28159f2017"
          //           }
          //         ]
          //       },
          //       "categories": {
          //         "data": [
          //           {
          //             "type": "category",
          //             "id": "d24fbadd-0067-487c-b45e-508947304906"
          //           },
          //           {
          //             "type": "category",
          //             "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
          //           },
          //           {
          //             "type": "category",
          //             "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
          //           }
          //         ]
          //       },
          //       "collections": {
          //         "data": [
          //           {
          //             "type": "collection",
          //             "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
          //           }
          //         ]
          //       },
          //       "brands": {
          //         "data": [
          //           {
          //             "type": "brand",
          //             "id": "85d0308a-8b82-423c-b2b0-87800d9e9862"
          //           }
          //         ]
          //       },
          //       "main_image": {
          //         "data": {
          //           "type": "main_image",
          //           "id": "9955ba31-1df1-4efa-ac97-89a8f80df76f"
          //         }
          //       }
          //     },
          //     "rating": 4,
          //     "discount": 20,
          //     "color": "Dark Sapphire",
          //     "fit": "Regular",
          //     "newArrival": false,
          //     "reviews": 7,
          //     "colorCode": "black",
          //     "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/9955ba31-1df1-4efa-ac97-89a8f80df76f.jpg",
          //     "brand": "SAMSØE & SAMSØE"
          //   },
          //   {
          //     "type": "product",
          //     "id": "200ad926-9563-4242-bb51-45de3898e1cc",
          //     "name": "Maasai o-n 9670",
          //     "slug": "SAMM_18122303",
          //     "sku": "SAMM_18122303",
          //     "manage_stock": true,
          //     "description": "100% cotton\nCrew neck\nRibbed knit texture pattern\nContrast trim\nFine wash at max. 30˚C\nItem number: 16055535\nSKU: SAMM18122303\nID: 16055529",
          //     "price": [
          //       {
          //         "amount": 990,
          //         "currency": "SEK",
          //         "includes_tax": true
          //       }
          //     ],
          //     "status": "live",
          //     "commodity_type": "physical",
          //     "meta": {
          //       "timestamps": {
          //         "created_at": "2018-04-14T10:51:34+00:00",
          //         "updated_at": "2018-04-14T19:16:37+00:00"
          //       },
          //       "display_price": {
          //         "with_tax": {
          //           "amount": 990,
          //           "currency": "SEK",
          //           "formatted": "990 kr"
          //         },
          //         "without_tax": {
          //           "amount": 990,
          //           "currency": "SEK",
          //           "formatted": "990 kr"
          //         }
          //       },
          //       "stock": {
          //         "level": 10,
          //         "availability": "in-stock"
          //       }
          //     },
          //     "relationships": {
          //       "files": {
          //         "data": [
          //           {
          //             "type": "file",
          //             "id": "9333e56e-a8cb-46ee-b2f1-aeeba6233466"
          //           }
          //         ]
          //       },
          //       "categories": {
          //         "data": [
          //           {
          //             "type": "category",
          //             "id": "d24fbadd-0067-487c-b45e-508947304906"
          //           },
          //           {
          //             "type": "category",
          //             "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
          //           },
          //           {
          //             "type": "category",
          //             "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
          //           }
          //         ]
          //       },
          //       "collections": {
          //         "data": [
          //           {
          //             "type": "collection",
          //             "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
          //           }
          //         ]
          //       },
          //       "brands": {
          //         "data": [
          //           {
          //             "type": "brand",
          //             "id": "85d0308a-8b82-423c-b2b0-87800d9e9862"
          //           }
          //         ]
          //       },
          //       "main_image": {
          //         "data": {
          //           "type": "main_image",
          //           "id": "a93a4194-f879-4259-b9d7-dc9f354786bb"
          //         }
          //       }
          //     },
          //     "rating": 5,
          //     "discount": 0,
          //     "color": "Clear Cream",
          //     "fit": "Regular",
          //     "newArrival": true,
          //     "reviews": 7,
          //     "colorCode": "white",
          //     "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/a93a4194-f879-4259-b9d7-dc9f354786bb.jpg",
          //     "brand": "SAMSØE & SAMSØE"
          //   },
          //   {
          //     "type": "product",
          //     "id": "4e124dde-2dd0-471a-8bbd-c1b64e3f5457",
          //     "name": "Cotton Cable Crew",
          //     "slug": "GCL_1000002",
          //     "sku": "GCL_1000002",
          //     "manage_stock": true,
          //     "description": "Fit: Regular\nMaterial: Outer fabric: cotton 100%\nOuter fabric: cotton 100%\nCable knit\nFine wash at max. 40˚C",
          //     "price": [
          //       {
          //         "amount": 1250,
          //         "currency": "SEK",
          //         "includes_tax": true
          //       }
          //     ],
          //     "status": "live",
          //     "commodity_type": "physical",
          //     "meta": {
          //       "timestamps": {
          //         "created_at": "2018-04-14T10:42:29+00:00",
          //         "updated_at": "2018-04-14T19:54:43+00:00"
          //       },
          //       "display_price": {
          //         "with_tax": {
          //           "amount": 1250,
          //           "currency": "SEK",
          //           "formatted": "1,250 kr"
          //         },
          //         "without_tax": {
          //           "amount": 1250,
          //           "currency": "SEK",
          //           "formatted": "1,250 kr"
          //         }
          //       },
          //       "stock": {
          //         "level": 15,
          //         "availability": "in-stock"
          //       }
          //     },
          //     "relationships": {
          //       "files": {
          //         "data": [
          //           {
          //             "type": "file",
          //             "id": "5b6c5890-7e2b-40d6-bca1-7a0675b28024"
          //           },
          //           {
          //             "type": "file",
          //             "id": "2a9f4c21-f53d-416f-a1b2-0d4694ec13aa"
          //           }
          //         ]
          //       },
          //       "categories": {
          //         "data": [
          //           {
          //             "type": "category",
          //             "id": "d24fbadd-0067-487c-b45e-508947304906"
          //           },
          //           {
          //             "type": "category",
          //             "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
          //           },
          //           {
          //             "type": "category",
          //             "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
          //           }
          //         ]
          //       },
          //       "collections": {
          //         "data": [
          //           {
          //             "type": "collection",
          //             "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
          //           }
          //         ]
          //       },
          //       "brands": {
          //         "data": [
          //           {
          //             "type": "brand",
          //             "id": "1e0240ab-53fa-4f30-acef-b361754616d1"
          //           }
          //         ]
          //       },
          //       "main_image": {
          //         "data": {
          //           "type": "main_image",
          //           "id": "ef14e8ce-d86e-4dca-9cba-95ff81f748e7"
          //         }
          //       }
          //     },
          //     "rating": 5,
          //     "discount": 10,
          //     "color": "Sand Melange",
          //     "fit": "Regular",
          //     "newArrival": false,
          //     "reviews": 16,
          //     "colorCode": "brown",
          //     "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/ef14e8ce-d86e-4dca-9cba-95ff81f748e7.jpg",
          //     "brand": "Gant"
          //   },
          //   {
          //     "type": "product",
          //     "id": "3ddd02b6-3575-408e-a59b-1be90e12cb3d",
          //     "name": "Cotton Cable Crew",
          //     "slug": "GCL_1000001",
          //     "sku": "GCL_1000001",
          //     "manage_stock": true,
          //     "description": "Fit: Regular\nMaterial: Outer fabric: cotton 100%\nOuter fabric: cotton 100%\nCable knit\nFine wash at max. 40˚C",
          //     "price": [
          //       {
          //         "amount": 1500,
          //         "currency": "SEK",
          //         "includes_tax": true
          //       }
          //     ],
          //     "status": "live",
          //     "commodity_type": "physical",
          //     "meta": {
          //       "timestamps": {
          //         "created_at": "2018-04-14T10:38:14+00:00",
          //         "updated_at": "2018-04-14T19:54:50+00:00"
          //       },
          //       "display_price": {
          //         "with_tax": {
          //           "amount": 1500,
          //           "currency": "SEK",
          //           "formatted": "1,500 kr"
          //         },
          //         "without_tax": {
          //           "amount": 1500,
          //           "currency": "SEK",
          //           "formatted": "1,500 kr"
          //         }
          //       },
          //       "stock": {
          //         "level": 25,
          //         "availability": "in-stock"
          //       }
          //     },
          //     "relationships": {
          //       "files": {
          //         "data": [
          //           {
          //             "type": "file",
          //             "id": "157c84df-c237-40db-8328-8af591e496b5"
          //           },
          //           {
          //             "type": "file",
          //             "id": "9668e5f5-4a12-4448-99e0-e195b59ad233"
          //           }
          //         ]
          //       },
          //       "categories": {
          //         "data": [
          //           {
          //             "type": "category",
          //             "id": "d24fbadd-0067-487c-b45e-508947304906"
          //           },
          //           {
          //             "type": "category",
          //             "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
          //           },
          //           {
          //             "type": "category",
          //             "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
          //           }
          //         ]
          //       },
          //       "collections": {
          //         "data": [
          //           {
          //             "type": "collection",
          //             "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
          //           }
          //         ]
          //       },
          //       "brands": {
          //         "data": [
          //           {
          //             "type": "brand",
          //             "id": "1e0240ab-53fa-4f30-acef-b361754616d1"
          //           }
          //         ]
          //       },
          //       "main_image": {
          //         "data": {
          //           "type": "main_image",
          //           "id": "9ec801f4-8f0b-4006-a75d-8ae896d1e217"
          //         }
          //       }
          //     },
          //     "rating": 4,
          //     "discount": 0,
          //     "color": "Yale Blue",
          //     "fit": "Regular",
          //     "newArrival": false,
          //     "reviews": 10,
          //     "colorCode": "blue",
          //     "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/9ec801f4-8f0b-4006-a75d-8ae896d1e217.jpg",
          //     "brand": "Gant"
          //   },
          //   {
          //     "type": "product",
          //     "id": "be5a48e7-40ee-43c9-bfe3-f0e12af65169",
          //     "name": "Cotton Cable Crew",
          //     "slug": "GCL_1000000",
          //     "sku": "GCL_1000000",
          //     "manage_stock": true,
          //     "description": "Fit: Regular\nMaterial: Outer fabric: cotton 100%\nOuter fabric: cotton 100%\nCable knit\nFine wash at max. 40˚C",
          //     "price": [
          //       {
          //         "amount": 1500,
          //         "currency": "SEK",
          //         "includes_tax": true
          //       }
          //     ],
          //     "status": "live",
          //     "commodity_type": "physical",
          //     "meta": {
          //       "timestamps": {
          //         "created_at": "2018-04-13T04:42:06+00:00",
          //         "updated_at": "2018-04-14T19:54:56+00:00"
          //       },
          //       "display_price": {
          //         "with_tax": {
          //           "amount": 1500,
          //           "currency": "SEK",
          //           "formatted": "1,500 kr"
          //         },
          //         "without_tax": {
          //           "amount": 1500,
          //           "currency": "SEK",
          //           "formatted": "1,500 kr"
          //         }
          //       },
          //       "stock": {
          //         "level": 0,
          //         "availability": "out-stock"
          //       }
          //     },
          //     "relationships": {
          //       "files": {
          //         "data": [
          //           {
          //             "type": "file",
          //             "id": "0e868183-ba1a-4ad0-9a1d-6083ebdbb811"
          //           },
          //           {
          //             "type": "file",
          //             "id": "7dc2f96b-3020-404b-a49c-8209893b5e01"
          //           }
          //         ]
          //       },
          //       "categories": {
          //         "data": [
          //           {
          //             "type": "category",
          //             "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
          //           },
          //           {
          //             "type": "category",
          //             "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
          //           },
          //           {
          //             "type": "category",
          //             "id": "d24fbadd-0067-487c-b45e-508947304906"
          //           }
          //         ]
          //       },
          //       "collections": {
          //         "data": [
          //           {
          //             "type": "collection",
          //             "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
          //           }
          //         ]
          //       },
          //       "brands": {
          //         "data": [
          //           {
          //             "type": "brand",
          //             "id": "1e0240ab-53fa-4f30-acef-b361754616d1"
          //           }
          //         ]
          //       },
          //       "main_image": {
          //         "data": {
          //           "type": "main_image",
          //           "id": "6f0f7c2c-6db0-447e-999a-8a7b0174cbcb"
          //         }
          //       }
          //     },
          //     "rating": 5,
          //     "discount": 0,
          //     "color": "Pacific Blue",
          //     "fit": "Regular",
          //     "newArrival": true,
          //     "reviews": 17,
          //     "colorCode": "blue",
          //     "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/6f0f7c2c-6db0-447e-999a-8a7b0174cbcb.jpg",
          //     "brand": "Gant"
          //   }
          // ]);
          break;
        default:
          //navigate to unknown page
          this.router.navigate(['unknown']);
          break;
      }
    })
  }

  getType() {
    return PageType[this.type].toString();
  }

  getAllProducts() {
    this.startBlocking();
    let productsService = this.productService.callGet(CallOperator.AllProducts);
    if (productsService instanceof Promise) {
      productsService.then(
        promise => promise.subscribe(
          products => {
            this.loadProducts(products.data);
          },
          error => { // catch observer error (in getting products)
            this.loadProductsError();
          }))
        .catch(
          error => { // // catch promise error (in getting api token)
            this.loadProductsError();
          }
        )
    }
    else {
      productsService.subscribe(
        (products) => {
          this.loadProducts(products.data);
        },
        error => { // catch observer error (in getting products)
          this.loadProductsError();
        })
    }
  }

  private startBlocking() {
    this.blockUIProducts.start();
    this.errorMessage.text = "";
  }

  loadProductsError() {
    if (this.blockUIProducts.isActive) this.blockUIProducts.stop();
    //this.products = [];
    this.errorMessage.text = "Unexpected error while loading. Admin is notified.";
  }

  loadProducts(products) {
    if (this.blockUIProducts.isActive) this.blockUIProducts.stop();
    if (!products || products.length === 0) {
      this.toast('No products found! Try different search options', 'Warning', 'warning', 5000);
      //this.products = [];
      this.errorMessage.text = "No products found! Try different search options";
      return;
    }
    
    for (let product of products) {
      let tProduct: Product = new Product();
      tProduct.id = product.id;
      tProduct.sku = product.sku;
      tProduct.slug = product.slug;
      tProduct.name = product.name;
      tProduct.collections = product.relationships.collections.data;
      tProduct.categories = product.relationships.categories.data;
      tProduct.brands = product.relationships.brands.data;
      tProduct.brand = product.brand;
      let price: Price = new Price(product.meta.display_price.with_tax.amount, product.meta.display_price.with_tax.formatted, product.meta.display_price.with_tax.currency);
      tProduct.price = price;
      tProduct.images.push(Config.baseImagesUrl + product.relationships.main_image.data.id + ".jpg");
      for(let img of product.relationships.files.data) {
        tProduct.images.push(Config.baseImagesUrl + img.id + ".jpg");
      }
      tProduct.discount = product.discount;
      tProduct.rating = product.rating;
      tProduct.color = product.color;
      tProduct.colorCode = product.colorCode;
      tProduct.fit = product.fit;
      tProduct.newArrival = product.newArrival;
      tProduct.reviews = product.reviews;
      tProduct.description = product.description;
      this.products.push(tProduct);
    }
    this.errorMessage.text = ""
  }

  private toast(message, header, type, timeOut) {
    switch (type) {
      case "error":
        this.toastr.error(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
      case "warning":
        this.toastr.warning(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
      case "info":
        this.toastr.info(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
      case "success":
        this.toastr.success(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
    }
  }

  onProductSelected(product) {
    //console.log(product);
  }
}
