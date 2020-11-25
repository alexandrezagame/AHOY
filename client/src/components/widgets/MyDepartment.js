import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDepartmentMembers } from '../../store/actions/profileActions';
import '../../stylesheets/myDepartment.css';
import Card from '../layout/Card';
import { Link } from 'react-router-dom';

const MyDepartment = ({ profile, getDepartmentMembers, departmentMembers }) => {
  useEffect(() => {
    getDepartmentMembers(profile.department);
  }, [profile]);

  return (
    <Card>
      <div className="card-title">
        <h5>My Department</h5>
        <p>{profile.department}</p>
      </div>
      <div className="teamMembers">
        {departmentMembers.map((member) => {
          return (
            <>
              <div className="member-card">
                {/* <Link to={`/profiles/${auth.uid}`}></Link> */}
                <div className="member-avatar">
                  <img
                    src={
                      member.imgURL
                        ? member.imgURL
                        : 'https://cdn.statically.io/img/avatarfiles.alphacoders.com/866/86635.png'
                    }
                  />
                </div>
                <div clasName="member-name">
                  {member.firstName} {member.lastName}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    departmentMembers: state.profileData.departmentMembers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDepartmentMembers: (department) =>
      dispatch(getDepartmentMembers(department)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDepartment);
