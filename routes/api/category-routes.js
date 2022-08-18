const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  
  Category.findAll({

    include: [
      {
        model: Product,
        attributes:['id', 'name', 'price', 'stock']
      }
    ]

  })
  .then(dbCatData => res.json(dbCatData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes:['id', 'name', 'price', 'stock']
      }
    ]
  })
  .then(dbCatData => {
    if (!dbCatData[0]) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbCatData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.post('/', (req, res) => {
  
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCatData => res.json(dbCatData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })

});

router.put('/:id', (req, res) => {
  
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCatData => {
    if (!dbCatData[0]) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbCatData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCatData => {
    if (!dbCatData[0]) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbCatData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
