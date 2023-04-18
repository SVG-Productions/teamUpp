import { useLoaderData } from "react-router-dom";

export const ListingDetailsPage = () => {
  const { team, teammates, listin } = useLoaderData();
  return <div>LISTING DETAILS PAGE</div>;
};

export const listingDetailsLoader = async ({ request, params }) => {
  const { teamId, listingId } = req.params;
  const [teamData, teammatesData, listingData] = await Promise.all([
    axios.get(`/api/teams/${teamId}`),
    axios.get(`/api/teams/${teamId}/teammates`),
    axios.get(`/api/listings/${listingId}`),
  ]);

  const team = teamData.data;
  const teammates = teammatesData.data;
  const listing = listingData.data;

  return { team, teammates, listing };
};
