import mongoose, { Schema, Model } from 'mongoose';

// 1. Creo una interface que representa un documento en MongoDB.
export interface IApartamento {
  numeroApartamento: string;
  ubicacion: string;
  areaMts: number;
  precio: number;
  duplex?: boolean;
  habitaciones: number;
  camasDobles: number;
  camasSencillas: number;
  camaNido: number;
  banos: number;
  aguaCaliente?: boolean;
  secadorCabello: number;
  salaEstar?: boolean;
  comedor: number;
  sofaCama: number;
  televisor: number;
  internet?: boolean;
  cocina?: boolean;
  nevera?: boolean;
  lavadora?: boolean;
  microondas?: boolean;
  cafetera?: boolean;
  licuadora?: boolean;
  tostadoraPan?: boolean;
  ollaPresion?: boolean;
  ollaArrocera?: boolean;
  sanduchera?: boolean;
  camaraSeguridad?: boolean;
  terrazaVista?: boolean;
}

// 2. Creo un Schema correspondiente a la interfaz del documento.
const apartamentoSchema = new Schema<IApartamento>(
  {
    numeroApartamento: {
      type: String,
      required: [true, "El número de apartamento es requerido."],
      trim: true,
      unique: true
    },
    ubicacion: {
      type: String,
      required: [true, "La ubicación es requerida."],
      trim: true,
    },
    areaMts: {
      type: Number,
      required: [true, "Area de metros cuadrado requerida"],
      validate: {
        validator: function (value: number) {
          return value > 0;
        },
        message: "El valor de mts debe ser mayor que cero",
      }
    },
    precio: {
      type: Number,
      required: [true, "El precio es requerido"],
      validate: {
        validator: function (value: number) {
          return value >= 0;
        },
        message: "El precio debe ser mayor que cero",
      },
    },
    duplex: {
      type: Boolean,
      default: false,
    },
    habitaciones: {
      type: Number,
      required: [true, "El numero de habitaciones es requerida"],
      validate: {
        validator: function (value: number) {
          return value > 0;
        },
        message: "El valor del numero de habitaciones, debe ser mayor que cero",
      },
    },
    camasDobles: {
      type: Number,
      required: [true, "El numero de camas dobles es requerido"],
      validate: {
        validator: function (value: number) {
          return value >= 0;
        },
        message: "El valor de camas dobles debe ser mayor que cero",
      },
    },
    camasSencillas: {
      type: Number,
      required: [true, "El numero de camas sencillas es requerido"],
      validate: {
        validator: function (value: number) {
          return value >= 0;
        },
        message: "El valor de camas sencillas debe ser mayor que cero",
      },
    },
    camaNido: {
      type: Number,
      required: [true, "El numero de camas tipo nido es requerida"],
      validate: {
        validator: function (value: number) {
          return value >= 0;
        },
        message: "El valor de cama Nido debe ser mayor que cero",
      },
    },
    banos: {
      type: Number,
      required: [true, "El numero de baños es requerido"],
      validate: {
        validator: function (value: number) {
          return value > 0;
        },
        message: "El valor de baños debe ser mayor que cero",
      },
    },
    aguaCaliente: {
      type: Boolean,
      default: false,
    },
    secadorCabello: {
      type: Number,
      required: [true, "El numero de secador para el cabello es requerido"],
      validate: {
        validator: function (value: number) {
          return value >= 0;
        },
        message: "El valor de numero de secadores, debe ser mayor que cero",
      },
    },
    salaEstar: {
      type: Boolean,
      default: false,
    },
    comedor: {
      type: Number,
      required: [true, "El numero de comedor es requerido"],
      validate: {
        validator: function (value: number) {
          return value > 0;
        },
        message: "El valor de comedor, debe ser mayor que cero",
      },
    },
    sofaCama: {
      type: Number,
      required: [true, "El numero de sofa camas es requerido"],
      validate: {
        validator: function (value: number) {
          return value > 0;
        },
        message: "El valor de sofa cama, debe ser mayor que cero",
      },
    },
    televisor: {
      type: Number,
      required: [true, "El numero de televisores es requerido"],
      validate: {
        validator: function (value: number) {
          return value > 0;
        },
        message: "El valor de televisor, debe ser mayor que cero",
      },
    },
    internet: {
      type: Boolean,
      default: false,
    },
    cocina: {
      type: Boolean,
      default: false,
    },
    nevera: {
      type: Boolean,
      default: false,
    },
    lavadora: {
      type: Boolean,
      default: false,
    },
    microondas: {
      type: Boolean,
      default: false,
    },
    cafetera: {
      type: Boolean,
      default: false,
    },
    licuadora: {
      type: Boolean,
      default: false,
    },
    tostadoraPan: {
      type: Boolean,
      default: false,
    },
    ollaPresion: {
      type: Boolean,
      default: false,
    },
    ollaArrocera: {
      type: Boolean,
      default: false,
    },
    sanduchera: {
      type: Boolean,
      default: false,
    },
    camaraSeguridad: {
      type: Boolean,
      default: false,
    },
    terrazaVista: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

// 3. Creo el Modelo.
let Apartamento: Model<IApartamento>;

// Valido que el modelo este creado si no lo esta lo crea
try {
  Apartamento = mongoose.model('Apartamento');
} catch (error) {
  Apartamento = mongoose.model('Apartamento', apartamentoSchema);
}

export default Apartamento