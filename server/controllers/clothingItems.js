const ClothingItem = require("../models/ClothingItem");
const { use } = require("../routes/clothingItems");

exports.getClothingItems = (req, res) => {
  if (req.session.isLoggedIn) {
    const userId = req.session.userId;
    ClothingItem.findAll({ where: { userId: userId } }).then((items) => {
      res.json(items);
    });
  } else {
    res.send("User is not logged in.");
  }
};

exports.postCreateClothingItems = (req, res) => {
  if (req.session.isLoggedIn) {
    const userId = req.session.userId;
    ClothingItem.create({
      name: req.body.name,
      numWears: 0,
      wearsUntilWash: req.body.wearsUntilWash,
      userId: userId,
    });
    res.json({ res: "Clothing item added." });
  }
};

exports.postIncrementNumWearsById = (req, res) => {
  if (req.session.isLoggedIn) {
    const userId = req.session.userId;
    const clothingItemId = req.body.id;
    ClothingItem.findByPk(clothingItemId).then((clothingItem) => {
      const newNumWears = clothingItem.numWears + 1;
      ClothingItem.update(
        { numWears: newNumWears },
        { where: { id: clothingItemId } }
      ).then(() => {
        ClothingItem.findAll({ where: { userId: userId } }).then((items) => {
          res.json(items);
        });
      });
    });
  }
};

exports.postDecrementNumWearsById = (req, res) => {
  if (req.session.isLoggedIn) {
    const userId = req.session.userId;
    const clothingItemId = req.body.id;
    ClothingItem.findByPk(clothingItemId).then((clothingItem) => {
      const newNumWears = clothingItem.numWears - 1;
      if (newNumWears >= 0) {
        ClothingItem.update(
          { numWears: newNumWears },
          { where: { id: clothingItemId } }
        ).then(() => {
          ClothingItem.findAll({ where: { userId: userId } }).then((items) => {
            res.json(items);
          });
        });
      } else {
        ClothingItem.findAll({ where: { userId: userId } }).then((items) => {
          res.json(items);
        });
      }
    });
  }
};

exports.postResetNumWearsById = (req, res) => {
  if (req.session.isLoggedIn) {
    const userId = req.session.userId;
    const clothingItemId = req.body.id;
    ClothingItem.update(
      { numWears: 0 },
      { where: { id: clothingItemId } }
    ).then(() => {
      ClothingItem.findAll({ where: { userId: userId } }).then((items) => {
        res.json(items);
      });
    });
  }
};

exports.postSaveEdits = (req, res) => {
  if (req.session.isLoggedIn) {
    const userId = req.session.userId;
    const edits = req.body;
    ClothingItem.findAll({ where: { userId: userId } }).then((items) => {
      let count = items.length;
      for (item of items) {
        const itemId = item.id;
        const itemInEdits = edits.filter((item) => item.id == itemId);
        if (itemInEdits.length <= 0) {
          ClothingItem.destroy({ where: { id: itemId } }).then(() => {
            count--;
            if (count <= 0) {
              ClothingItem.findAll({ where: { userId: userId } }).then(
                (items) => res.json(items)
              );
            }
          });
        } else {
          const newItem = itemInEdits[0];
          ClothingItem.update(
            { name: newItem.name, wearsUntilWash: newItem.wearsUntilWash },
            { where: { id: itemId } }
          ).then(() => {
            count--;
            if (count <= 0) {
              ClothingItem.findAll({ where: { userId: userId } }).then(
                (items) => res.json(items)
              );
            }
          });
        }
      }
    });
  }
};
