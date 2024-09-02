import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { show_alert } from '../functions';
import withReactContent from 'sweetalert2-react-content';


const HeroList = () => {
    const urlHeroes = 'http://localhost:8000/heroes';
    const urlPublishers = 'http://localhost:8000/publishers';
    const urlGenders = 'http://localhost:8000/genders';
    const urlAlignments = 'http://localhost:8000/alignments';

    const [heroes, setHeroes] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [genders, setGenders] = useState([]);
    const [alignments, setAlignments] = useState([]);

    const [hero_id, setHero_Id] = useState(0);
    const [name, setName] = useState('');
    const [eye_color, setEye_color] = useState('');
    const [hair_color, setHair_color] = useState('');
    const [skin_color, setSkin_color] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [race, setRace] = useState('');
    const [publisher_id, setPublisher_id] = useState(0);
    const [gender_id, setGender_id] = useState(0);
    const [alignment_id, setAlignment_id] = useState(0);
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalHeroes, setTotalHeroes] = useState(0);
    const heroesPerPage = 10;



const races = [
    'Human',
    'Mutant',
    'Alien',
    'God',
    'Cyborg'
];



    useEffect(() => {
        fetchHeroes();
        fetchPublishers();
        fetchGenders();
        fetchAlignments();
    }, [currentPage]);


    const fetchHeroes = async () => {
        try {
            const response = await axios.get(urlHeroes, {
                params: {
                    limit: heroesPerPage,
                    offset: (currentPage - 1) * heroesPerPage,
                    page: currentPage,
                }
            });
            setHeroes(response.data.data);
            setTotalHeroes(response.data.total);
        } catch (error) {
            console.error('Error fetching heroes:', error);
        }
    };

    const fetchPublishers = async () => {
        try {
            const response = await axios.get(urlPublishers);
            setPublishers(response.data.data);
        } catch (error) {
            console.error('Error fetching publishers:', error);
        }
    };

    const fetchGenders = async () => {
        try {
            const response = await axios.get(urlGenders);
            setGenders(response.data.data);
        } catch (error) {
            console.error('Error fetching genders:', error);
        }
    };

    const fetchAlignments = async () => {
        try {
            const response = await axios.get(urlAlignments);
            setAlignments(response.data.data);
        } catch (error) {
            console.error('Error fetching alignments:', error);
        }
    };

    const generateUniqueHeroId = async () => {
        const minId = 1;
        const maxId = 1000;
        let newId;
        let idExists = true;
    
        while (idExists) {
            newId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
    
            try {
                const response = await axios.get(`http://localhost:8000/check-hero-id`, {
                    params: { hero_id: newId }
                });
                idExists = response.data.exists;
            } catch (error) {
                console.error('Error checking hero ID:', error);
                idExists = false; 
            }
        }
    
        return newId;
    };

    const openModal = async(op, id = '', name = '', eye_color = '', hair_color = '', skin_color = '', height = '', weight = '', race = '', publisher = '', gender = '', alignment = '') => {
        if (op === 1) { // Add hero operation
            const newHeroId = await generateUniqueHeroId();
            setHero_Id(newHeroId);
        } else {
            setHero_Id(id);
        }

        setName(name);
        setEye_color(eye_color);
        setHair_color(hair_color);
        setSkin_color(skin_color);
        setHeight(height);
        setWeight(weight);
        setRace(race);
        setPublisher_id(publisher);
        setGender_id(gender);
        setAlignment_id(alignment);
        setOperation(op);
        setTitle(op === 1 ? 'Agregar Héroe' : 'Editar Héroe');
    
        window.setTimeout(() => {
            document.getElementById('name').focus();
        }, 500);
    };

    const validar = () => {
        if (name.trim() === '') {
            show_alert('Escribe el nombre del Héroe', 'error');
            return;
        }
    
        const parsedWeight = parseInt(weight, 10);
        const parsedHeight = parseInt(height, 10);
        const parsedPublisherId = parseInt(publisher_id, 10);
        const parsedGenderId = parseInt(gender_id, 10);
        const parsedAlignmentId = parseInt(alignment_id, 10);
    
        if (isNaN(parsedWeight) || isNaN(parsedHeight)) {
            show_alert('Altura y peso deben ser números válidos', 'error');
            return;
        }
    
        const parametros = {
            hero_id,
            name,
            eye_color,
            hair_color,
            skin_color,
            height: parsedHeight,
            weight: parsedWeight,
            race,
            publisher_id: parsedPublisherId,
            gender_id: parsedGenderId,
            alignment_id: parsedAlignmentId
        };
    
        const metodo = operation === 1 ? 'POST' : 'PUT';
        enviarSolicitud(parametros, hero_id, metodo);
    };
    
    const enviarSolicitud = async (heroData, heroId, metodo) => {
        try {
            const url = metodo === 'POST' ? `http://localhost:8000/heroes` : `http://localhost:8000/heroes/${heroId}`;
            const response = await axios({
                method: metodo,
                url,
                data: heroData
            });
            console.log('Héroe guardado:', response.data);

            Swal.fire({
                icon: 'success',
                title: metodo === 'POST' ? 'Héroe agregado con éxito' : 'Héroe actualizado con éxito',
                showConfirmButton: true,
            }).then(() => {
                document.getElementById('btnCerrar').click();
            });

            fetchHeroes();
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                show_alert(`Error: ${error.response.data.detail}`, 'error');
            } else if (error.request) {
                console.error('No response received:', error.request);
                show_alert('No se recibió respuesta del servidor', 'error');
            } else {
                console.error('Error setting up request:', error.message);
                show_alert(`Error en la configuración de la solicitud: ${error.message}`, 'error');
            }
        }
    }

    const deleteHero = async (hero_id, name) => {
        const Myswal = withReactContent(Swal);
        
        Myswal.fire({
            title: '¿Estás seguro de eliminar a '+name+'?',
            icon: 'question', text: 'No podrás revertir esta acción',
            showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar'
        }).then((result) => {
            if(result.isConfirmed){
                setHero_Id(hero_id);
                enviarSolicitud({}, hero_id, 'DELETE');

            }
            else {
                show_alert('Operación cancelada', 'info');
            }
        })

    }
    

    const totalPages = Math.ceil(totalHeroes / heroesPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i)}>
                        {i}
                    </button>
                </li>
            );
        }

        return pageNumbers;
    };


    return (

        <div className='App'>

            {/* Header */}
            <header className="bg-dark text-white py-3">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-lg-4">
                                <h1 className="ms-5">HEROES</h1>
                            </div>
                            {/* Buscador */}
                            <div className="col-lg-8">
                                <div className="row g-2 justify-content-end">
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                        />
                                        
                                    </div>
                                    {/* Filtro Publisher */}
                                    <div className="col-md-2">
                                        <select className="form-select" name="publisher_id">
                                            <option value="">Publicadora</option>
                                            {publishers.map((publisher) => (
                                                <option key={publisher.publisher_id} value={publisher.publisher_id}>
                                                    {publisher.publisher_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* Filtro Race */}
                                    <div className="col-md-2">
                                        <select className="form-select" >
                                            <option value="">Raza</option>
                                            {races.map((race) => (
                                                <option key={race} value={race}>
                                                    {race}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* Filtro Gender */}
                                    <div className="col-md-2">
                                        <select className="form-select" name="gender_id" >
                                            <option value="">Género</option>
                                            {genders.map((gender) => (
                                                <option key={gender.gender_id} value={gender.gender_id}>
                                                    {gender.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* Filtro Alignment */}
                                    <div className="col-md-2">
                                        <select className="form-select" name="alignment_id" >
                                            <option value="">Alineación</option>
                                            {alignments.map((alignment) => (
                                                <option key={alignment.alignment_id} value={alignment.alignment_id}>
                                                    {alignment.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </header>


            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={()=> openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalHeroes'>
                                <i className='fa-solid fa-circle-plus'></i> Añadir
                            </button>
                        </div>
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr><th>#</th><th>NOMBRE</th><th>CASA PUBLICADORA</th><th>GENERO</th><th>ALTURA</th><th>PESO</th></tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {heroes.map((hero, i)=>(
                                        <tr key={hero.hero_id}>
                                            <td>{hero.hero_id}</td>
                                            <td>{hero.name}</td>
                                            <td>{publishers.map((publisher, i) => {
                                                if(publisher.publisher_id === hero.publisher_id){
                                                    return publisher.publisher_name;
                                                }
                                                return null;
                                            })}</td>
                                            <td>{genders.map((gender, i) => {
                                                if(gender.gender_id === hero.gender_id){
                                                    return gender.name;
                                                }
                                                return null;
                                            })}</td>
                                            <td>{hero.height}</td>
                                            <td>{hero.weight}</td>
                                            <td>
                                                <button onClick={()=> openModal(2, hero.hero_id, hero.name, hero.eye_color, hero.hair_color, hero.skin_color, hero.weight, hero.height,hero.race,  hero.publisher_id, hero.gender_id, hero.alignment_id)} className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalHeroes'>
                                                    <i className='fa-solid fa-pencil'></i>
                                                </button>
                                                &nbsp;
                                                <button onClick={()=> deleteHero(hero.hero_id, hero.name)} className='btn btn-danger' >
                                                    <i className='fa-solid fa-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {totalHeroes > heroesPerPage && (
                    <div className='row mt-3'>
                        <div className='col-md-8 offset-md-2'>
                        <nav>
                                <ul className="pagination justify-content-center">
                                    {currentPage > 1 && (
                                        <li className="page-item">
                                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                                Previous
                                            </button>
                                        </li>
                                    )}
                                    {renderPageNumbers()}
                                    {currentPage < totalPages && (
                                        <li className="page-item">
                                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                                Next
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
            <div id='modalHeroes' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{title}</label>
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='hero_id'></input>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-address-card '></i></span>
                                <input type='text' id='name' className='form-control' placeholder='Nombre' value={name} onChange={(e)=> setName(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-eye'></i></span>
                                <input type='text' id='eye_color' className='form-control' placeholder='Color de ojos' value={eye_color} onChange={(e)=> setEye_color(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-paint-brush'></i></span>
                                <input type='text' id='hair_color' className='form-control' placeholder='Color de pelo' value={hair_color} onChange={(e)=> setHair_color(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
                                <input type='text' id='skin_color' className='form-control' placeholder='Color de piel' value={skin_color} onChange={(e)=> setSkin_color(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-level-up'></i></span>
                                <input type='text' id='height' className='form-control' placeholder='Altura' value={height} onChange={(e)=> setHeight(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-cutlery'></i></span>
                                <input type='text' id='weight' className='form-control' placeholder='Peso' value={weight} onChange={(e)=> setWeight(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-rocket'></i></span>
                                <input type='text' id='race' className='form-control' placeholder='Raza' value={race} onChange={(e)=> setRace(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <select className="form-select" name="publisher_id" id="publisher_id" value={publisher_id} onChange={(e)=> setPublisher_id(e.target.value)}>
                                                <option value="">Casa Publicadora</option>
                                                {publishers.map((publisher) => (
                                                    <option key={publisher.publisher_id} value={publisher.publisher_id} >
                                                        {publisher.publisher_name}
                                                    </option>
                                                ))}
                                </select>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <select className="form-select" name="gender_id" id="gender_id" value={gender_id} onChange={(e)=> setGender_id(e.target.value)}>
                                            <option value="">Género</option>
                                            {genders.map((gender) => (
                                                <option key={gender.gender_id} value={gender.gender_id}>
                                                    {gender.name}
                                                </option>
                                            ))}
                                </select>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <select className="form-select" name="alignment_id" id="alignment_id" value={alignment_id} onChange={(e)=> setAlignment_id(e.target.value)}>
                                            <option value="">Alineación</option>
                                            {alignments.map((alignment) => (
                                                <option key={alignment.alignment_id} value={alignment.alignment_id}>
                                                    {alignment.name}
                                                </option>
                                            ))}
                                </select>
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button onClick={()=> validar()} className='btn btn-success'>
                                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                                </button>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' id='btnCerrar'className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroList;
