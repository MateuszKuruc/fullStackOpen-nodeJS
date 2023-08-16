const User = ({ user }) => {
  return (
    <div>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            {/* <td>{user.username}</td> */}
            <td>
              <h4>{user.name}</h4>
            </td>
            <td>blogs created: {user.blogs.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default User;
