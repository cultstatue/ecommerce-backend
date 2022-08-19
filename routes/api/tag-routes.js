const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { findAll } = require('../../models/Tag');

// The `/api/tags` endpoint

router.get('/', (req, res) => {

  Tag.findAll({
    
    include: [
      {
        model: Product,
        attributes: [ 'id', 'product_name', 'price', 'stock', 'category_id'],

      },
    ]
  })
  .then(dbTagData => res.json(dbTagData ))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: [ 'id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  
});

router.post('/', (req, res) => {

  Tag.create({

    tag_name: req.body.tag_name,
    product_id: req.body.products

  })
  .then(dbTagData => res.json(dbTagData ))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({

    tag_name: req.body.tag_name

  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  
});

module.exports = router;
