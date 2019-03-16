import Excel from './Excel';

const exporters = { excel: Excel };

export default (req) => {
  const { params: { docType } } = req;
  return exporters[docType].claimReport(req);
};
