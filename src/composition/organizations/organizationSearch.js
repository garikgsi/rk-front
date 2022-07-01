import organizationRepository from "@/composition/organizations/organizationRepository";

export default function organizationSearch() {
  const { organizations } = organizationRepository();

  const getOrganizationById = (id) => {
    if (organizations.value) {
      return [...organizations.value].find((item) => item.id == id);
    }
    return null;
  };

  return { getOrganizationById };
}
