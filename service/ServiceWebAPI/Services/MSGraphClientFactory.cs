using Microsoft.Graph;
using Microsoft.Identity.Web;
using System.Net.Http.Headers;

namespace ServiceWebAPI.Services
{
    public class MSGraphClientFactory
    {
        private readonly ITokenAcquisition _tokenAcquisition;

        public MSGraphClientFactory(ITokenAcquisition tokenAcquisition)
        {
            _tokenAcquisition = tokenAcquisition;
        }

        public GraphServiceClient CreateGraphClient(params string[] scopes)
        {
            return new GraphServiceClient(
                new DelegateAuthenticationProvider(
                    async (requestMessage) =>
                    {
                        var result = await _tokenAcquisition.GetAccessTokenForUserAsync(scopes);
                        requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", result);
                    }));
        }
    }
}
