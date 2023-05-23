const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const session = require("express-session");
require("./db.js");

//################🔥 FIREBASE🔥 #######################
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const credentials = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

// Configuración de JWT
const JWT_SECRET = "holagerman"; // ¡Asegúrate de cambiar esto en producción!
const accessTokenExpirationTime = "1h"; // Tiempo de expiración del token de acceso: 1 hora
const refreshTokenExpirationTime = "7d"; // Tiempo de expiración del token de actualización: 7 días

// ####################################################

const server = express();
server.name = "API";
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());
server.use(session({
  secret: 'holagerman', // Clave secreta para firmar la sesión
  resave: false, // No guardar la sesión si no hay cambios
  saveUninitialized: false, // No guardar sesiones vacías
  cookie: {
    secure: false,
    maxAge: 1800000 // 1 minuto
  }
}));

// Endpoint de login
server.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Autenticar al usuario con email y contraseña
  admin
    .auth()
    .getUserByEmail(email)
    .then((UserRecord) => {
      const userID = UserRecord.uid;
      const token = jwt.sign({ userID }, JWT_SECRET);
      res.json({token});
    })
    .catch((error) => {
      // La autenticación ha fallado
      console.log(error)
      res.status(401).json({ message: "Credenciales inválidas" });
    });
});

const isAuthenticated = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized');
  }

  const accessToken = authorizationHeader.split('Bearer ')[1]

  jwt.verify(accessToken, JWT_SECRET, (error, decoded) => {
    if (error) {
      console.error(`Error al verificar el token JWT: ${error}`);
      return res.status(401).send("Acceso no autorizado");
    }

    const userId = decoded.userId;
    req.userId = userId;
    console.log("AUTORIZADO");
    next();
  });
};

server.post("/signup", (req, res) => {
  const { email, password } = req.body;

  admin
    .auth()
    .createUser({
      email,
      password,
    })
    .then((userRecord) => {
      // Nuevo usuario creado con éxito
      console.log(`Nuevo usuario creado con UID: ${userRecord.uid}`);
      res.status(200).send("Nuevo usuario creado con éxito");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error al crear el usuario");
    });
});


// server.use("/", isAuthenticated);
server.use("/", routes);

server.use(cors());
// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
