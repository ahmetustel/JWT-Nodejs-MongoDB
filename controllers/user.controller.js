const User = require("../shemas/user.shema");
const brcpt = require('bcrypt');


const getUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};


const getUser = async (req, res) => {
  try {
    const searhedUser = await User.findOne({ name: req.params.name });
    res.status(200).json(searhedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};


const createUser = async (req, res) => {
  try {
    const salt = await brcpt.genSalt();
    const hashedPassword = await brcpt.hash(req.body.password, salt);

    console.log(req.body.name);
    console.log(req.body.password);
    console.log(hashedPassword);

    //shemadan "user" objesi oluşturup oluşturulan objeye post edilen body değişkenlerini atmak hata almamızı engeller. Bunun için;
    const newUser = await new User({ name: req.body.name, password: hashedPassword }); // user object oluşturulur
    const createdUser = await newUser.save(); // oluşturulan object veritabanına kaydedilir.
    res.status(201).json({ status: true, message: createdUser });

  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const users = await User.find();
  const loginingUser = users.find(user => user.name === req.body.name);

  if (loginingUser == null) {
    console.log('cannot find user');
    return res.status(400).send('cannot find user');
  }
  try {
    if (await brcpt.compare(req.body.password, loginingUser.password)) {
      console.log('Success');
      res.send('Success');
    } else {
      console.log('Not Allowed');
      res.send('Not Allowed');
    }
  } catch (error) {
    res.status(500).send();
  }
};

// ŞİMDİLİK KULLANMAYACAĞIZ
// const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };


const deleteUser = async (req, res) => {
  try {
    const searhedUser = await User.findOne({ name: req.params.name });
    console.log(searhedUser.name, ' is deleted');
    const deletedUser = await User.deleteOne(searhedUser);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
  // updateUser,
  deleteUser,
};