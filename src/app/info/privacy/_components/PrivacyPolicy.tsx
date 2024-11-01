import { PageContainer } from '@/components/layout/PageContainer';

import { ChangesToPrivacyPolicy } from './ChangesToPrivacyPolicy';
import { ChildrensPrivacy } from './ChildrensPrivacy';
import { ContactUs } from './ContactUs';
import { DeletePersonalData } from './DeletePersonalData';
import { DisclosureOfPersonalData } from './DisclosureOfPersonalData';
import { InterpretationAndDefinitions } from './InterpretationAndDefinitions';
import { LinksToOtherWebsites } from './LinksToOtherWebsites';
import { PrivacyPolicyMain } from './PrivacyPolicyMain';
import { RetentionOfPersonalData } from './RetentionOfPersonalData';
import { SecurityOfPersonalData } from './SecurityOfPersonalData';
import { TransferOfPersonalData } from './TransferOfPersonalData';
import { TypesOfDataCollected } from './TypesOfDataCollected';
import { UseOfYourPersonalData } from './UseOfYourPersonalData';

export const PrivacyPolicy: React.FC = () => {
	return (
		<PageContainer scroll className="h-full">
			<PrivacyPolicyMain />
			<InterpretationAndDefinitions />
			<TypesOfDataCollected />
			<UseOfYourPersonalData />
			<RetentionOfPersonalData />
			<TransferOfPersonalData />
			<DeletePersonalData />
			<DisclosureOfPersonalData />
			<SecurityOfPersonalData />
			<ChildrensPrivacy />
			<LinksToOtherWebsites />
			<ChangesToPrivacyPolicy />
			<ContactUs />
		</PageContainer>
	);
};
