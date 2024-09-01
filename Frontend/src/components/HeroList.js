import React, {useEffect, useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import { show_alert } from '../functions';


const HeroList = () => {
    const url = 'http://localhost:8000/heroes';
    const [heroes, setHeroes] = useState([]);
    const [hero_id, setHero_Id] = useState(0);
    const [name, setName] = useState('');
    const [eye_color, setEye_color] = useState('');
    const [hair_color, setHair_color] = useState('');
    const [skin_color, setSkin_color] = useState('');
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [race, setRace] = useState('');
    const [publisher_id, setPublisher_id] = useState(0);
    const [gender_id, setGender_id] = useState(0);
    const [alignment_id, setAlignment_id] = useState(0);
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalHeroes, setTotalHeroes] = useState(0);
    const heroesPerPage = 10;


    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const response = await axios.get(url, {
                    params: {
                        limit: heroesPerPage,
                        offset: (currentPage - 1) * heroesPerPage,
                    },
                });
                setHeroes(response.data.data);
                setTotalHeroes(response.data.total);
            } catch (error) {
                console.error('Error fetching heroes:', error);
            }
        };

        fetchHeroes();
    }, [currentPage]);

    const handleEdit = (id) => {
        console.log(id.hero_id);
    };

    const handleDelete = async (id) => {
        console.log(id.hero_id);
    };

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
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalHeroes'>
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
                                            <td>{hero.publisher_id}</td>
                                            <td>{hero.gender_id}</td>
                                            <td>{hero.height}</td>
                                            <td>{hero.weight}</td>
                                            <td>
                                                <button className='btn btn-warning' >
                                                    <i className='fa-solid fa-pencil'></i>
                                                </button>
                                                &nbsp;
                                                <button className='btn btn-danger' >
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
        </div>
    );
}

export default HeroList;
