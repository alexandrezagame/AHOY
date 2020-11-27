import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDepartmentMembers } from '../../store/actions/profileActions';
import Card from '../layout/Card';
import { Link } from 'react-router-dom';
import '../../stylesheets/myDepartment.css';

const MyDepartment = ({ profile, getDepartmentMembers, departmentMembers }) => {
  useEffect(() => {
    getDepartmentMembers(profile.department);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <Card
      heading='My department'
      subHeading={profile.department}
      className='department-component'>
      <div className='teamMembers'>
        {departmentMembers.map(member => {
          return (
            <div key={member.id}>
              <div className='member-card'>
                <Link to={`/profiles/${member.id}`}>
                  <div className='member-avatar'>
                    <img
                      src={
                        member.imgURL
                          ? member.imgURL
                          : 'https://cdn.statically.io/img/avatarfiles.alphacoders.com/866/86635.png'
                      }
                    />
                  </div>
                  <div className='member-name'>
                    {member.firstName} {member.lastName}
                  </div>
                  {member.isOnline ? (
                    <p style={{ color: 'green' }}>Online</p>
                  ) : (
                    <p style={{ color: 'red' }}>Offline</p>
                  )}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    departmentMembers: state.profileData.departmentMembers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDepartmentMembers: department =>
      dispatch(getDepartmentMembers(department)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDepartment);
