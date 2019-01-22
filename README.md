# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

For possible further development

## `artists`
| column name       | data type | details                        |
|:------------------|:---------:|:-------------------------------|
| `id`              | integer   | not null, primary key          |
| `name`            | integer   | not null, indexed              |
| `img_url`         | string    |                                |
| `fb_url`          | string    |                                | 
| `twitter_url`     | string    |                                |
| `vimeo_url`       | string    |                                |            
| `created_at`      | datetime  | not null                       |
| `updated_at`      | datetime  | not null                       |

+ index on `:name, unique: true`