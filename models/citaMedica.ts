//file models/citaMedica.ts
import {
  BasicCitaMedica,
  CitaMedica,
  CitaMedicaWithDetails,
} from "../types/citaMedica";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
export const create = (cita: CitaMedica, callback: Function) => {
  if (cita.paciente?.pacienteId) {
    const queryString =
      "INSERT INTO CitasMedicas(IdDoctor, IdPaciente, Especialidad, Fecha, Disponibilidad)VALUES(?,?,?,?,?);";
    db.query(
      queryString,
      [
        cita.doctor.doctorId,
        cita.paciente?.pacienteId,
        cita.especialidad.especialidadId,
        cita.fecha,
        cita.disponibilidad,
      ],
      (err, result) => {
        if (err) {
          callback(err);
        }
        const insertId = (<OkPacket>result).insertId;
        callback(null, insertId);
      }
    );
  } else {
    const queryString =
      "INSERT INTO CitasMedicas(IdDoctor, Especialidad, Fecha, Disponibilidad)VALUES(?,?,?,?);";
    db.query(
      queryString,
      [
        cita.doctor.doctorId,
        cita.especialidad.especialidadId,
        cita.fecha,
        cita.disponibilidad,
      ],
      (err, result) => {
        if (err) {
          callback(err);
        }
        const insertId = (<OkPacket>result).insertId;
        callback(null, insertId);
      }
    );
  }
};
export const findOne = (citaId: number, callback: Function) => {
  try {
    const queryString = `
      SELECT cm.IdCita, d.IdDoctor, d.Nombre as NombreDoc, d.Apellido as ApellidoDoc, e.IdEspecialidad, e.NombreEspecialidad, c.IdConsultorio, c.Piso, c.NumeroConsultorio, c.Disponibilidad, d.CorreoContacto, p.IdPaciente, p.Nombre as NombrePac, p.Apellido as ApellidoPac, p.NumeroCedula, p.FechaNacimiento, p.Telefono, e.IdEspecialidad, e.NombreEspecialidad, cm.Fecha, cm.Disponibilidad
      FROM CitasMedicas cm
      JOIN Doctores d ON cm.IdDoctor = d.IdDoctor
      JOIN Especialidades e ON e.IdEspecialidad = cm.Especialidad AND e.IdEspecialidad = d.Especialidad
      JOIN Consultorios c ON c.IdConsultorio = d.Consultorio
      LEFT JOIN Pacientes p ON cm.IdPaciente = p.IdPaciente WHERE cm.IdCita=?
    `;

    db.query(queryString, citaId, (err, result) => {
      if (err) {
        callback(err);
      } else {
        const row = (<RowDataPacket[]>result)[0];
        if (!row) {
          callback(
            new Error("No se encontró ninguna cita con el ID proporcionado.")
          );
        } else {
          const cita: CitaMedicaWithDetails = {
            citaId: row.IdCita,
            especialidad: {
              especialidadId: row.IdEspecialidad,
              nombreEspecialidad: row.NombreEspecialidad,
            },
            doctor: {
              doctorId: row.IdDoctor,
              nombre: row.NombreDoc,
              apellido: row.ApellidoDoc,
              especialidad: {
                especialidadId: row.IdEspecialidad,
                nombreEspecialidad: row.NombreEspecialidad,
              },
              consultorio: {
                consultorioId: row.IdConsultorio,
                divisionPiso: row.Piso,
                numeroConsultorio: row.NumeroConsultorio,
                disponibilidad: row.Disponibilidad,
              },
              correoContacto: row.CorreoContacto,
            },
            paciente: {
              pacienteId: row.IdPaciente,
              nombre: row.NombrePac,
              apellido: row.ApellidoPac,
              numeroCedula: row.NumeroCedula,
              fechaNacimiento: row.FechaNacimiento,
              telefono: row.Telefono,
            },
            fecha: row.Fecha,
            disponibilidad: row.Disponibilidad,
          };
          callback(null, cita);
        }
      }
    });
  } catch (error) {
    callback(error);
  }
};

export const findAllEspe = (especialidadId: number, callback: Function) => {
  const queryString = `
  SELECT cm.IdCita, d.IdDoctor, d.Nombre as NombreDoc, d.Apellido as ApellidoDoc, e.IdEspecialidad, e.NombreEspecialidad, c.IdConsultorio, c.Piso, c.NumeroConsultorio, c.Disponibilidad, d.CorreoContacto, p.IdPaciente, p.Nombre as NombrePac, p.Apellido as ApellidoPac, p.NumeroCedula, p.FechaNacimiento, p.Telefono, e.IdEspecialidad, e.NombreEspecialidad, cm.Fecha, cm.Disponibilidad
FROM CitasMedicas cm
JOIN Doctores d ON cm.IdDoctor = d.IdDoctor
JOIN Especialidades e ON e.IdEspecialidad = cm.Especialidad AND e.IdEspecialidad = d.Especialidad
JOIN Consultorios c ON c.IdConsultorio = d.Consultorio
LEFT JOIN Pacientes p ON cm.IdPaciente = p.IdPaciente WHERE e.IdEspecialidad=?`;

  db.query(queryString, especialidadId, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    const citas: CitaMedica[] = [];

    rows.forEach((row) => {
      const cita: CitaMedicaWithDetails = {
        citaId: row.IdCita,
        especialidad: {
          especialidadId: row.IdEspecialidad,
          nombreEspecialidad: row.NombreEspecialidad,
        },
        doctor: {
          doctorId: row.IdDoctor,
          nombre: row.NombreDoc,
          apellido: row.ApellidoDoc,
          especialidad: {
            especialidadId: row.IdEspecialidad,
            nombreEspecialidad: row.NombreEspecialidad,
          },
          consultorio: {
            consultorioId: row.IdConsultorio,
            divisionPiso: row.Piso,
            numeroConsultorio: row.NumeroConsultorio,
            disponibilidad: row.Disponibilidad,
          },
          correoContacto: row.CorreoContacto,
        },
        paciente: {
          pacienteId: row.IdPaciente,
          nombre: row.Nombre,
          apellido: row.Apellido,
          numeroCedula: row.NumeroCedula,
          fechaNacimiento: row.FechaNacimiento,
          telefono: row.Telefono,
        },
        fecha: row.Fecha,
        disponibilidad: row.Disponibilidad,
      };
      citas.push(cita);
    });
    callback(null, citas);
  });
};
export const findAll = (callback: Function) => {
  const queryString = `
  SELECT cm.IdCita, d.IdDoctor, d.Nombre as NombreDoc, d.Apellido as ApellidoDoc, e.IdEspecialidad, e.NombreEspecialidad, c.IdConsultorio, c.Piso, c.NumeroConsultorio, c.Disponibilidad, d.CorreoContacto, p.IdPaciente, p.Nombre as NombrePac, p.Apellido as ApellidoPac, p.NumeroCedula, p.FechaNacimiento, p.Telefono, e.IdEspecialidad, e.NombreEspecialidad, cm.Fecha, cm.Disponibilidad
FROM CitasMedicas cm
JOIN Doctores d ON cm.IdDoctor = d.IdDoctor
JOIN Especialidades e ON e.IdEspecialidad = cm.Especialidad AND e.IdEspecialidad = d.Especialidad
JOIN Consultorios c ON c.IdConsultorio = d.Consultorio
LEFT JOIN Pacientes p ON cm.IdPaciente = p.IdPaciente order by cm.Disponibilidad desc,cm.IdCita ASC`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    const citas: CitaMedica[] = [];

    rows.forEach((row) => {
      const cita: CitaMedicaWithDetails = {
        citaId: row.IdCita,
        especialidad: {
          especialidadId: row.IdEspecialidad,
          nombreEspecialidad: row.NombreEspecialidad,
        },
        doctor: {
          doctorId: row.IdDoctor,
          nombre: row.NombreDoc,
          apellido: row.ApellidoDoc,
          especialidad: {
            especialidadId: row.IdEspecialidad,
            nombreEspecialidad: row.NombreEspecialidad,
          },
          consultorio: {
            consultorioId: row.IdConsultorio,
            divisionPiso: row.Piso,
            numeroConsultorio: row.NumeroConsultorio,
            disponibilidad: row.Disponibilidad,
          },
          correoContacto: row.CorreoContacto,
        },
        paciente: {
          pacienteId: row.IdPaciente,
          nombre: row.NombrePac,
          apellido: row.ApellidoPac,
          numeroCedula: row.NumeroCedula,
          fechaNacimiento: row.FechaNacimiento,
          telefono: row.Telefono,
        },
        fecha: row.Fecha,
        disponibilidad: row.Disponibilidad,
      };
      citas.push(cita);
    });
    callback(null, citas);
  });
};
export const update = (cita: CitaMedica, callback: Function) => {
  const queryString = `UPDATE CitasMedicas
    SET IdDoctor=?, IdPaciente=?, Especialidad=?, Fecha=?, Disponibilidad=?
    WHERE IdCita=?`;

  db.query(
    queryString,
    [
      cita.doctor?.doctorId,
      cita.paciente?.pacienteId,
      cita.especialidad.especialidadId,
      cita.fecha,
      cita.disponibilidad,
      cita.citaId,
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      const numUpdate = (<OkPacket>result).affectedRows;
      const responseJSON = {
        estado: true,
        id: cita.citaId,
        mensaje: "Operación exitosa",
      };
      callback(null, { numUpdate, responseJSON });
    }
  );
};
