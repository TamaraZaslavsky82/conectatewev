import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPharmacyOnDuty } from '../../redux/actions';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Asegúrate de tener instalado react-icons

const PharmacyOnDutyList = () => {
    const dispatch = useDispatch();
    const pharmacies = useSelector(state => state.pharmacyOnDuty);
    const [categoryId] = useState(39);
    const [isOpen, setIsOpen] = useState(true); // Inicia el modal abierto

    useEffect(() => {
        dispatch(GetPharmacyOnDuty());
    }, [dispatch]);

    const now = new Date();

    const farmaciasDeHoy = Array.isArray(pharmacies)
        ? pharmacies
            .filter(pharmacy => parseInt(pharmacy.id_category) === categoryId)
            .filter(pharmacy => {
                const startTime = new Date(pharmacy.start_time.replace(" ", "T"));
                const endTime = new Date(pharmacy.end_time.replace(" ", "T"));
                return now >= startTime && now <= endTime;
            })
        : [];

    return (
        <div className="flex   items- bg-blue-950  h-30"> <div className=" bg-blue-950 shadow-xl rounded-lg border border-gray-200 z-50">
            {/* Encabezado */}
            <div
                className="flex items-center justify-between p-4 cursor-pointer bg-white text-gray-500 rounded-t-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                    <h3 className="font-semibold">Farmacia de Turno</h3>
                </div>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {/* Contenido */}
            {isOpen && (
                <div className="p-4 max-h-80 overflow-y-auto">
                    {farmaciasDeHoy.length > 0 ? (
                        <ul className="space-y-3">
                            {farmaciasDeHoy.map(pharmacy => (
                                <li key={pharmacy.id} className="border p-3 rounded-md shadow-sm bg-gray-50">
                                    <p><strong>Farmacia:</strong> {pharmacy.title}</p>
                                    <p><strong>Desde:</strong> {new Date(pharmacy.start_time).toLocaleString()}</p>
                                    <p><strong>Hasta:</strong> {new Date(pharmacy.end_time).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No hay farmacias de turno para hoy.</p>
                    )}
                </div>
            )}
        </div>
        </div>

    );
};

export default PharmacyOnDutyList;
