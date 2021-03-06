import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry. You must supply a token.</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset your password for you sir? Token: {query.token}</p>
      <Reset token={query.token} />
    </div>
  );
}
