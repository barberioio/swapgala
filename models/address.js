const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const auth = require('../authentication');

const thailandProvinces = [
  'Bangkok',
  'Samut Prakan',
  'Nonthaburi',
  'Pathum Thani',
  'Samut Sakhon',
  'Samut Songkhram',
  'Phetchaburi',
  'Prachuap Khiri Khan',
  'Ratchaburi',
  'Kanchanaburi',
  'Suphan Buri',
  'Nakhon Pathom',
  'Uthai Thani',
  'Chainat',
  'Sing Buri',
  'Ang Thong',
  'Lop Buri',
  'Saraburi',
  'Nonthaburi',
  'Nakhon Nayok',
  'Prachin Buri',
  'Chachoengsao',
  'Nonthaburi',
  'Chonburi',
  'Rayong',
  'Chanthaburi',
  'Trat',
  'Chumphon',
  'Ranong',
  'Surat Thani',
  'Phang Nga',
  'Phuket',
  'Krabi',
  'Nakhon Si Thammarat',
  'Trang',
  'Phatthalung',
  'Satun',
  'Songkhla',
  'Pattani',
  'Yala',
  'Narathiwat',
  'Kalasin',
  'Khon Kaen',
  'Udon Thani',
  'Nong Khai',
  'Loei',
  'Sakon Nakhon',
  'Nakhon Phanom',
  'Mukdahan',
  'Chiang Mai',
  'Lamphun',
  'Lampang',
  'Uttaradit',
  'Phrae',
  'Nan',
  'Phayao',
  'Chiang Rai',
  'Mae Hong Son',
  'Nong Bua Lamphu',
  'Bung Kan',
  'Si Sa Ket',
  'Surin',
  'Roi Et',
  'Buriram',
  'Chaiyaphum',
  'Loei',
  'Mahasarakham',
  'Nakhon Ratchasima',
  'Buri Ram',
  'Ubon Ratchathani',
  'Amnat Charoen',
  'Nakhon Sawan',
  'Tak',
  'Phitsanulok',
  'Sukhothai',
  'Phra Nakhon Si Ayutthaya',
  'Kamphaeng Phet',
  'Phichit',
  'Phetchabun',
];

const AddressSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobilePhone: {
    type: Number,
    required: true,
  },
  orderEmail: {
    type: mongoose.Schema.Types.String,
    ref: 'User',
    require: true
  },
  address: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
    enum: thailandProvinces,
  },
  postcode: {
    type: Number,
    required: true,
  },
});

const Address = mongoose.model('Address', AddressSchema);


const validateAddress = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized. Please log in first.',
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorized. Invalid token.',
        token
      });
    }

    req.body.orderEmail = decoded.email;

    const { firstName, lastName, mobilePhone, orderEmail, address, province, postcode } = req.body;

    if (!firstName || !lastName || !mobilePhone || !orderEmail || !address || !province || !postcode) {
      return res.status(400).json({
        message: 'Missing required fields.',
      });
    }

    if (mobilePhone.toString().length !== 10) {
      return res.status(400).json({
        message: 'Phone number must be 10 digits long.',
      });
    }

    if (address.length < 30) {
      return res.status(400).json({
        message: 'Address must be at least 15 characters long.',
      });
    }

    if (postcode.toString().length !== 5) {
      return res.status(400).json({
        message: 'Postcode must be 5 digits long.',
      });
    }

    next();
  })
};

const saveAddress = async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
  const decoded = jwt.decode(req.headers['authorization'].split(' ')[1]);
  const user = await auth.User.findById(decoded.id);

  if (!user) {
    return res.status(401).json({
      message: 'User not found.',
    });
  }

  const { firstName, lastName, mobilePhone, address, province, postcode } = req.body;

  const addressOrder = new Address({
    firstName,
    lastName,
    mobilePhone,
    orderEmail: user.email,
    address,
    province,
    postcode,
    userId: user._id
  });

  await addressOrder.save();

  res.status(201).json({
    message: 'Save Address successfully.',
    token,
  });
};


module.exports = {
  Address,
  saveAddress,
  validateAddress
};
