import { Auth } from '../_components/Auth';
import { Register } from '../_components/Register';

export default function RegistePage() {
	return (
		<Auth title="create_account">
			<Register />
		</Auth>
	);
}
