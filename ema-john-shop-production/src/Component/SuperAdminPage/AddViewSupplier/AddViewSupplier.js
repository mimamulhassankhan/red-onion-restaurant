import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { setAllSupplier } from '../../../Redux/Actions/StoreActions';
import {faPen, faTrashAlt, faEye} from '@fortawesome/free-solid-svg-icons';

const AddViewSupplier = ({allSuppliers, setAllSupplier}) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const onSubmit = data => {
        fetch('http://localhost:5000/addSupplyPerson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            setAllSupplier([data, ...allSuppliers]);
            reset({});
        }); 
    }
    return (
        <>
        <form className="p-5 bg-white rounded m-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group row">
                <div className="col-6">
                    <div className="form-group">
                        <input type="text" ref={register({ required: true })} name="supplierName" placeholder="Supplier Name" className="form-control"/>
                        {errors.supplierName && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="email" ref={register({ required: true })} name="email" placeholder="Supplier Email" className="form-control"/>
                        {errors.email && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <input type="phone" ref={register({ required: true })} name="supplierPhone" placeholder="Supplier Phone" className="form-control"/>
                        {errors.supplierPhone && <span className="text-danger">This field is required</span>}
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <input type="password" ref={register({ required: true })} name="supplierPassword" placeholder="Supplier Password" className="form-control"/>
                        {errors.supplierPassword && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="supplierServiceArea">Service Area</label>
                        <select name="supplierServiceArea" ref={register({ required: true })} className="form-control">
                            <option value="uttara">Uttara</option>
                            <option value="gulshan">Gulshan</option>
                            <option value="banani">Banani</option>
                            <option value="mohakhali">Mohakhali</option>
                        </select>
                        {errors.supplierServiceArea && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="supplierStatus">Active Status</label>
                        <select name="supplierStatus" ref={register({ required: true })} className="form-control">
                            <option value="active">Active</option>
                            <option value="busy">Busy</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {errors.supplierStatus && <span className="text-danger">This field is required</span>}
                    </div>
                </div>
            </div>
            <div className="form-group text-right">
                <button type="submit" className="btn btn-dark px-5">Send</button>
            </div>
        </form>
        <Table className="text-center rounded m-2 bg-white p-3" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Service Area</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    allSuppliers.map(supplier => 
                    <tr key={supplier._id} className="align-center">
                        <td>1</td>
                        <td>{supplier.supplierName}</td>
                        <td>{supplier.supplierPhone}</td>
                        <td>{supplier.supplierServiceArea}</td>
                        <td>{supplier.supplierStatus}</td>
                        <td className="d-flex justify-content-around" >
                            <Button variant="success"><FontAwesomeIcon icon={faEye} /></Button>
                            <Button variant="info"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                            <Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button>
                        </td>
                    </tr>)
                }
                
            </tbody>
        </Table>
        </>
    );
};

const mapStateToProps = state => {
    return{
        allSuppliers: state.allSuppliers
    }
}

const mapDispatchToProps = {
    setAllSupplier: setAllSupplier
}

export default connect(mapStateToProps, mapDispatchToProps)(AddViewSupplier);